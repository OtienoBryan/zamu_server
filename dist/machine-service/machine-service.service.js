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
exports.MachineServiceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const machine_service_record_entity_1 = require("../entities/machine-service-record.entity");
const machine_service_part_entity_1 = require("../entities/machine-service-part.entity");
const machine_service_worker_entity_1 = require("../entities/machine-service-worker.entity");
const machine_entity_1 = require("../entities/machine.entity");
const raw_material_store_entity_1 = require("../entities/raw-material-store.entity");
const spare_part_entity_1 = require("../entities/spare-part.entity");
const spare_part_store_inventory_entity_1 = require("../entities/spare-part-store-inventory.entity");
const spare_part_inventory_ledger_entity_1 = require("../entities/spare-part-inventory-ledger.entity");
const staff_member_entity_1 = require("../entities/staff-member.entity");
const RELATIONS = ['machine', 'store', 'parts', 'parts.sparePart', 'workers', 'workers.staffMember'];
let MachineServiceService = class MachineServiceService {
    serviceRecordRepository;
    machineRepository;
    storeRepository;
    dataSource;
    constructor(serviceRecordRepository, machineRepository, storeRepository, dataSource) {
        this.serviceRecordRepository = serviceRecordRepository;
        this.machineRepository = machineRepository;
        this.storeRepository = storeRepository;
        this.dataSource = dataSource;
    }
    async findAll(machineId) {
        return this.serviceRecordRepository.find({
            where: machineId != null ? { machineId } : {},
            relations: RELATIONS,
            order: { startAt: 'DESC' },
        });
    }
    async findOne(id) {
        const record = await this.serviceRecordRepository.findOne({
            where: { id },
            relations: RELATIONS,
        });
        if (!record) {
            throw new common_1.NotFoundException(`Service record with ID ${id} not found`);
        }
        return record;
    }
    async create(dto, createdBy) {
        const machine = await this.machineRepository.findOne({ where: { id: dto.machineId } });
        if (!machine) {
            throw new common_1.NotFoundException(`Machine with ID ${dto.machineId} not found`);
        }
        const startAt = new Date(dto.startAt);
        const endAt = new Date(dto.endAt);
        if (endAt <= startAt) {
            throw new common_1.BadRequestException('End date/time must be after the start date/time');
        }
        const parts = dto.parts ?? [];
        const storeId = dto.storeId ?? machine.storeId ?? null;
        if (parts.length > 0 && storeId == null) {
            throw new common_1.BadRequestException('A store/location is required to deduct parts used — assign one to the machine or select one for this service');
        }
        let store = null;
        if (storeId != null) {
            store = await this.storeRepository.findOne({ where: { id: storeId } });
            if (!store) {
                throw new common_1.NotFoundException(`Store with ID ${storeId} not found`);
            }
        }
        const savedId = await this.dataSource.transaction(async (manager) => {
            const record = manager.create(machine_service_record_entity_1.MachineServiceRecord, {
                machineId: dto.machineId,
                storeId,
                startAt,
                endAt,
                description: dto.description,
                createdBy,
            });
            const savedRecord = await manager.save(machine_service_record_entity_1.MachineServiceRecord, record);
            for (const part of parts) {
                const sparePart = await manager.findOne(spare_part_entity_1.SparePart, { where: { id: part.sparePartId } });
                if (!sparePart) {
                    throw new common_1.NotFoundException(`Spare part with ID ${part.sparePartId} not found`);
                }
                const servicePart = manager.create(machine_service_part_entity_1.MachineServicePart, {
                    serviceRecordId: savedRecord.id,
                    sparePartId: part.sparePartId,
                    quantity: part.quantity,
                });
                await manager.save(machine_service_part_entity_1.MachineServicePart, servicePart);
                let inventory = await manager.findOne(spare_part_store_inventory_entity_1.SparePartStoreInventory, {
                    where: { storeId: storeId, sparePartId: part.sparePartId },
                });
                const previousQuantity = inventory ? Number(inventory.quantity) : 0;
                const newQuantity = previousQuantity - part.quantity;
                if (newQuantity < 0) {
                    throw new common_1.BadRequestException(`Cannot use ${part.quantity} of "${sparePart.name}" — only ${previousQuantity} in stock at ${store.name}`);
                }
                if (!inventory) {
                    inventory = manager.create(spare_part_store_inventory_entity_1.SparePartStoreInventory, { storeId: storeId, sparePartId: part.sparePartId, quantity: newQuantity });
                }
                else {
                    inventory.quantity = newQuantity;
                }
                await manager.save(spare_part_store_inventory_entity_1.SparePartStoreInventory, inventory);
                const ledgerEntry = manager.create(spare_part_inventory_ledger_entity_1.SparePartInventoryLedger, {
                    storeId: storeId,
                    sparePartId: part.sparePartId,
                    transactionType: 'adjustment_out',
                    quantity: part.quantity,
                    previousQuantity,
                    newQuantity,
                    notes: `Used in maintenance for ${machine.name} (Service #${savedRecord.id})`,
                    createdBy,
                });
                await manager.save(spare_part_inventory_ledger_entity_1.SparePartInventoryLedger, ledgerEntry);
            }
            const workerIds = Array.from(new Set(dto.workerIds ?? []));
            for (const staffMemberId of workerIds) {
                const staffMember = await manager.findOne(staff_member_entity_1.StaffMember, { where: { id: staffMemberId } });
                if (!staffMember) {
                    throw new common_1.NotFoundException(`Staff member with ID ${staffMemberId} not found`);
                }
                const worker = manager.create(machine_service_worker_entity_1.MachineServiceWorker, {
                    serviceRecordId: savedRecord.id,
                    staffMemberId,
                });
                await manager.save(machine_service_worker_entity_1.MachineServiceWorker, worker);
            }
            return savedRecord.id;
        });
        return this.findOne(savedId);
    }
};
exports.MachineServiceService = MachineServiceService;
exports.MachineServiceService = MachineServiceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(machine_service_record_entity_1.MachineServiceRecord)),
    __param(1, (0, typeorm_1.InjectRepository)(machine_entity_1.Machine)),
    __param(2, (0, typeorm_1.InjectRepository)(raw_material_store_entity_1.RawMaterialStore)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], MachineServiceService);
//# sourceMappingURL=machine-service.service.js.map