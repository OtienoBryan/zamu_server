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
exports.SparePartInventoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const spare_part_store_inventory_entity_1 = require("../entities/spare-part-store-inventory.entity");
const spare_part_inventory_ledger_entity_1 = require("../entities/spare-part-inventory-ledger.entity");
const raw_material_store_entity_1 = require("../entities/raw-material-store.entity");
const spare_part_entity_1 = require("../entities/spare-part.entity");
let SparePartInventoryService = class SparePartInventoryService {
    inventoryRepository;
    ledgerRepository;
    storeRepository;
    sparePartRepository;
    dataSource;
    constructor(inventoryRepository, ledgerRepository, storeRepository, sparePartRepository, dataSource) {
        this.inventoryRepository = inventoryRepository;
        this.ledgerRepository = ledgerRepository;
        this.storeRepository = storeRepository;
        this.sparePartRepository = sparePartRepository;
        this.dataSource = dataSource;
    }
    async findAllInventory() {
        return this.inventoryRepository.find({
            relations: ['store', 'sparePart'],
            order: { id: 'ASC' },
        });
    }
    async findLedger(sparePartId) {
        return this.ledgerRepository.find({
            where: sparePartId != null ? { sparePartId } : {},
            relations: ['store', 'sparePart'],
            order: { createdAt: 'DESC' },
        });
    }
    async applyMovement(manager, storeId, sparePartId, transactionType, quantity, newQuantity, notes, createdBy) {
        let inventory = await manager.findOne(spare_part_store_inventory_entity_1.SparePartStoreInventory, { where: { storeId, sparePartId } });
        const previousQuantity = inventory ? Number(inventory.quantity) : 0;
        if (!inventory) {
            inventory = manager.create(spare_part_store_inventory_entity_1.SparePartStoreInventory, { storeId, sparePartId, quantity: newQuantity });
        }
        else {
            inventory.quantity = newQuantity;
        }
        await manager.save(spare_part_store_inventory_entity_1.SparePartStoreInventory, inventory);
        const ledgerEntry = manager.create(spare_part_inventory_ledger_entity_1.SparePartInventoryLedger, {
            storeId,
            sparePartId,
            transactionType,
            quantity,
            previousQuantity,
            newQuantity,
            notes,
            createdBy,
        });
        const saved = await manager.save(spare_part_inventory_ledger_entity_1.SparePartInventoryLedger, ledgerEntry);
        return saved.id;
    }
    async createAdjustment(dto, createdBy) {
        const store = await this.storeRepository.findOne({ where: { id: dto.storeId } });
        if (!store) {
            throw new common_1.NotFoundException(`Store with ID ${dto.storeId} not found`);
        }
        const sparePart = await this.sparePartRepository.findOne({ where: { id: dto.sparePartId } });
        if (!sparePart) {
            throw new common_1.NotFoundException(`Spare part with ID ${dto.sparePartId} not found`);
        }
        const ledgerId = await this.dataSource.transaction(async (manager) => {
            const inventory = await manager.findOne(spare_part_store_inventory_entity_1.SparePartStoreInventory, {
                where: { storeId: dto.storeId, sparePartId: dto.sparePartId },
            });
            const previousQuantity = inventory ? Number(inventory.quantity) : 0;
            const newQuantity = dto.direction === 'in' ? previousQuantity + dto.quantity : previousQuantity - dto.quantity;
            if (newQuantity < 0) {
                throw new common_1.BadRequestException(`Cannot remove ${dto.quantity} — only ${previousQuantity} in stock at ${store.name}`);
            }
            return this.applyMovement(manager, dto.storeId, dto.sparePartId, dto.direction === 'in' ? 'adjustment_in' : 'adjustment_out', dto.quantity, newQuantity, dto.notes ?? null, createdBy);
        });
        return this.ledgerRepository.findOne({ where: { id: ledgerId }, relations: ['store', 'sparePart'] });
    }
    async setQuantity(dto, createdBy) {
        const store = await this.storeRepository.findOne({ where: { id: dto.storeId } });
        if (!store) {
            throw new common_1.NotFoundException(`Store with ID ${dto.storeId} not found`);
        }
        const sparePart = await this.sparePartRepository.findOne({ where: { id: dto.sparePartId } });
        if (!sparePart) {
            throw new common_1.NotFoundException(`Spare part with ID ${dto.sparePartId} not found`);
        }
        const ledgerId = await this.dataSource.transaction(async (manager) => {
            const inventory = await manager.findOne(spare_part_store_inventory_entity_1.SparePartStoreInventory, {
                where: { storeId: dto.storeId, sparePartId: dto.sparePartId },
            });
            const previousQuantity = inventory ? Number(inventory.quantity) : 0;
            const delta = dto.quantity - previousQuantity;
            if (delta === 0) {
                throw new common_1.BadRequestException('New quantity matches the current balance — nothing to update');
            }
            return this.applyMovement(manager, dto.storeId, dto.sparePartId, delta > 0 ? 'adjustment_in' : 'adjustment_out', Math.abs(delta), dto.quantity, dto.notes ?? 'Stock count update', createdBy);
        });
        return this.ledgerRepository.findOne({ where: { id: ledgerId }, relations: ['store', 'sparePart'] });
    }
    async transfer(dto, createdBy) {
        if (dto.fromStoreId === dto.toStoreId) {
            throw new common_1.BadRequestException('Source and destination stores must be different');
        }
        const [fromStore, toStore, sparePart] = await Promise.all([
            this.storeRepository.findOne({ where: { id: dto.fromStoreId } }),
            this.storeRepository.findOne({ where: { id: dto.toStoreId } }),
            this.sparePartRepository.findOne({ where: { id: dto.sparePartId } }),
        ]);
        if (!fromStore) {
            throw new common_1.NotFoundException(`Store with ID ${dto.fromStoreId} not found`);
        }
        if (!toStore) {
            throw new common_1.NotFoundException(`Store with ID ${dto.toStoreId} not found`);
        }
        if (!sparePart) {
            throw new common_1.NotFoundException(`Spare part with ID ${dto.sparePartId} not found`);
        }
        const { fromLedgerId, toLedgerId } = await this.dataSource.transaction(async (manager) => {
            const fromInventory = await manager.findOne(spare_part_store_inventory_entity_1.SparePartStoreInventory, {
                where: { storeId: dto.fromStoreId, sparePartId: dto.sparePartId },
            });
            const fromPrevious = fromInventory ? Number(fromInventory.quantity) : 0;
            if (fromPrevious < dto.quantity) {
                throw new common_1.BadRequestException(`Cannot transfer ${dto.quantity} — only ${fromPrevious} in stock at ${fromStore.name}`);
            }
            const fromLedgerId = await this.applyMovement(manager, dto.fromStoreId, dto.sparePartId, 'transfer_out', dto.quantity, fromPrevious - dto.quantity, dto.notes ? `${dto.notes} (to ${toStore.name})` : `Transferred to ${toStore.name}`, createdBy);
            const toInventory = await manager.findOne(spare_part_store_inventory_entity_1.SparePartStoreInventory, {
                where: { storeId: dto.toStoreId, sparePartId: dto.sparePartId },
            });
            const toPrevious = toInventory ? Number(toInventory.quantity) : 0;
            const toLedgerId = await this.applyMovement(manager, dto.toStoreId, dto.sparePartId, 'transfer_in', dto.quantity, toPrevious + dto.quantity, dto.notes ? `${dto.notes} (from ${fromStore.name})` : `Transferred from ${fromStore.name}`, createdBy);
            return { fromLedgerId, toLedgerId };
        });
        const [from, to] = await Promise.all([
            this.ledgerRepository.findOne({ where: { id: fromLedgerId }, relations: ['store', 'sparePart'] }),
            this.ledgerRepository.findOne({ where: { id: toLedgerId }, relations: ['store', 'sparePart'] }),
        ]);
        return { from: from, to: to };
    }
};
exports.SparePartInventoryService = SparePartInventoryService;
exports.SparePartInventoryService = SparePartInventoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(spare_part_store_inventory_entity_1.SparePartStoreInventory)),
    __param(1, (0, typeorm_1.InjectRepository)(spare_part_inventory_ledger_entity_1.SparePartInventoryLedger)),
    __param(2, (0, typeorm_1.InjectRepository)(raw_material_store_entity_1.RawMaterialStore)),
    __param(3, (0, typeorm_1.InjectRepository)(spare_part_entity_1.SparePart)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], SparePartInventoryService);
//# sourceMappingURL=spare-part-inventory.service.js.map