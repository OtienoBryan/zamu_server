"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SparePartRequestsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const spare_part_request_entity_1 = require("../entities/spare-part-request.entity");
const spare_part_request_item_entity_1 = require("../entities/spare-part-request-item.entity");
const raw_material_store_entity_1 = require("../entities/raw-material-store.entity");
const spare_part_entity_1 = require("../entities/spare-part.entity");
const spare_part_store_inventory_entity_1 = require("../entities/spare-part-store-inventory.entity");
const spare_part_inventory_ledger_entity_1 = require("../entities/spare-part-inventory-ledger.entity");
const machine_entity_1 = require("../entities/machine.entity");
const staff_member_entity_1 = require("../entities/staff-member.entity");
const RELATIONS = ['store', 'machine', 'staffMember', 'items', 'items.sparePart'];
let SparePartRequestsService = class SparePartRequestsService {
    requestRepository;
    itemRepository;
    storeRepository;
    sparePartRepository;
    machineRepository;
    staffMemberRepository;
    dataSource;
    constructor(requestRepository, itemRepository, storeRepository, sparePartRepository, machineRepository, staffMemberRepository, dataSource) {
        this.requestRepository = requestRepository;
        this.itemRepository = itemRepository;
        this.storeRepository = storeRepository;
        this.sparePartRepository = sparePartRepository;
        this.machineRepository = machineRepository;
        this.staffMemberRepository = staffMemberRepository;
        this.dataSource = dataSource;
    }
    async findAll() {
        return this.requestRepository.find({
            relations: RELATIONS,
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const request = await this.requestRepository.findOne({
            where: { id },
            relations: RELATIONS,
        });
        if (!request) {
            throw new common_1.NotFoundException(`Spare part request with ID ${id} not found`);
        }
        return request;
    }
    async create(dto, requestedBy) {
        const store = await this.storeRepository.findOne({ where: { id: dto.storeId } });
        if (!store) {
            throw new common_1.NotFoundException(`Store with ID ${dto.storeId} not found`);
        }
        if (dto.machineId != null) {
            const machine = await this.machineRepository.findOne({ where: { id: dto.machineId } });
            if (!machine) {
                throw new common_1.NotFoundException(`Machine with ID ${dto.machineId} not found`);
            }
        }
        if (dto.staffMemberId != null) {
            const staffMember = await this.staffMemberRepository.findOne({ where: { id: dto.staffMemberId } });
            if (!staffMember) {
                throw new common_1.NotFoundException(`Staff member with ID ${dto.staffMemberId} not found`);
            }
        }
        const sparePartIds = [...new Set(dto.items.map((i) => i.sparePartId))];
        const sparePartsFound = await this.sparePartRepository.find({ where: { id: (0, typeorm_2.In)(sparePartIds) } });
        if (sparePartsFound.length !== sparePartIds.length) {
            const foundIds = new Set(sparePartsFound.map((p) => p.id));
            const missing = sparePartIds.filter((id) => !foundIds.has(id));
            throw new common_1.NotFoundException(`Spare part(s) not found: ${missing.join(', ')}`);
        }
        const request = this.requestRepository.create({
            storeId: dto.storeId,
            machineId: dto.machineId ?? null,
            staffMemberId: dto.staffMemberId ?? null,
            requestedBy,
            notes: dto.notes ?? null,
            status: 'pending',
            items: dto.items.map((i) => this.itemRepository.create({ sparePartId: i.sparePartId, quantity: i.quantity })),
        });
        const saved = await this.requestRepository.save(request);
        return this.findOne(saved.id);
    }
    async fulfill(id, dto, fulfilledBy) {
        const request = await this.findOne(id);
        if (request.status !== 'pending') {
            throw new common_1.ConflictException(`Request is already ${request.status}`);
        }
        const fulfilledAt = dto.fulfilledAt ? new Date(dto.fulfilledAt) : new Date();
        const fulfillmentNotes = dto.notes?.trim() || null;
        await this.dataSource.transaction(async (manager) => {
            for (const item of request.items) {
                const inventory = await manager.findOne(spare_part_store_inventory_entity_1.SparePartStoreInventory, {
                    where: { storeId: request.storeId, sparePartId: item.sparePartId },
                });
                const previousQuantity = inventory ? Number(inventory.quantity) : 0;
                const requestedQuantity = Number(item.quantity);
                const newQuantity = previousQuantity - requestedQuantity;
                if (newQuantity < 0) {
                    const partName = item.sparePart?.name || `#${item.sparePartId}`;
                    throw new common_1.BadRequestException(`Cannot fulfill — only ${previousQuantity} of "${partName}" in stock at ${request.store?.name || 'this store'} (requested ${requestedQuantity})`);
                }
                if (!inventory) {
                    await manager.save(spare_part_store_inventory_entity_1.SparePartStoreInventory, manager.create(spare_part_store_inventory_entity_1.SparePartStoreInventory, {
                        storeId: request.storeId,
                        sparePartId: item.sparePartId,
                        quantity: newQuantity,
                    }));
                }
                else {
                    inventory.quantity = newQuantity;
                    await manager.save(spare_part_store_inventory_entity_1.SparePartStoreInventory, inventory);
                }
                await manager.save(spare_part_inventory_ledger_entity_1.SparePartInventoryLedger, manager.create(spare_part_inventory_ledger_entity_1.SparePartInventoryLedger, {
                    storeId: request.storeId,
                    sparePartId: item.sparePartId,
                    transactionType: 'adjustment_out',
                    quantity: requestedQuantity,
                    previousQuantity,
                    newQuantity,
                    notes: fulfillmentNotes ? `Fulfilled request #${request.id}: ${fulfillmentNotes}` : `Fulfilled request #${request.id}`,
                    createdBy: fulfilledBy,
                }));
            }
            await manager.update(spare_part_request_entity_1.SparePartRequest, request.id, {
                status: 'fulfilled',
                fulfilledAt,
                fulfillmentNotes,
            });
        });
        return this.findOne(id);
    }
    async cancel(id) {
        const request = await this.findOne(id);
        if (request.status !== 'pending') {
            throw new common_1.ConflictException(`Request is already ${request.status}`);
        }
        request.status = 'cancelled';
        await this.requestRepository.save(request);
        return this.findOne(id);
    }
};
exports.SparePartRequestsService = SparePartRequestsService;
exports.SparePartRequestsService = SparePartRequestsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(spare_part_request_entity_1.SparePartRequest)),
    __param(1, (0, typeorm_1.InjectRepository)(spare_part_request_item_entity_1.SparePartRequestItem)),
    __param(2, (0, typeorm_1.InjectRepository)(raw_material_store_entity_1.RawMaterialStore)),
    __param(3, (0, typeorm_1.InjectRepository)(spare_part_entity_1.SparePart)),
    __param(4, (0, typeorm_1.InjectRepository)(machine_entity_1.Machine)),
    __param(5, (0, typeorm_1.InjectRepository)(staff_member_entity_1.StaffMember)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], SparePartRequestsService);
//# sourceMappingURL=spare-part-requests.service.js.map