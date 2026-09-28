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
exports.InventoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const inventory_entity_1 = require("../entities/inventory.entity");
const inventory_ledger_entity_1 = require("../entities/inventory-ledger.entity");
const inventory_transaction_dto_1 = require("./dto/inventory-transaction.dto");
let InventoryService = class InventoryService {
    inventoryRepository;
    inventoryLedgerRepository;
    dataSource;
    constructor(inventoryRepository, inventoryLedgerRepository, dataSource) {
        this.inventoryRepository = inventoryRepository;
        this.inventoryLedgerRepository = inventoryLedgerRepository;
        this.dataSource = dataSource;
    }
    async findAll() {
        console.log('📦 [InventoryService] Finding all inventory');
        const inventory = await this.inventoryRepository.find({
            relations: ['store', 'part'],
            order: { last_updated: 'DESC' },
        });
        console.log(`✅ [InventoryService] Found ${inventory.length} inventory records`);
        return inventory;
    }
    async findByStore(storeId) {
        console.log(`📦 [InventoryService] Finding inventory for store: ${storeId}`);
        const inventory = await this.inventoryRepository.find({
            where: { store_id: storeId },
            relations: ['store', 'part'],
            order: { last_updated: 'DESC' },
        });
        return inventory;
    }
    async findByPart(partId) {
        console.log(`📦 [InventoryService] Finding inventory for part: ${partId}`);
        const inventory = await this.inventoryRepository.find({
            where: { part_id: partId },
            relations: ['store', 'part'],
            order: { last_updated: 'DESC' },
        });
        return inventory;
    }
    async findOne(id) {
        console.log(`📦 [InventoryService] Finding inventory by ID: ${id}`);
        const inventory = await this.inventoryRepository.findOne({
            where: { id },
            relations: ['store', 'part'],
        });
        if (!inventory) {
            throw new common_1.NotFoundException(`Inventory with ID ${id} not found`);
        }
        return inventory;
    }
    async create(createInventoryDto) {
        console.log('📦 [InventoryService] Creating/updating inventory record');
        const existing = await this.inventoryRepository.findOne({
            where: {
                store_id: createInventoryDto.store_id,
                part_id: createInventoryDto.part_id,
            },
            relations: ['store', 'part'],
        });
        if (existing) {
            console.log('📦 [InventoryService] Inventory record exists, updating instead');
            existing.quantity = createInventoryDto.quantity !== undefined ? createInventoryDto.quantity : existing.quantity;
            existing.min_stock_level = createInventoryDto.min_stock_level !== undefined ? createInventoryDto.min_stock_level : existing.min_stock_level;
            existing.location = createInventoryDto.location !== undefined ? createInventoryDto.location : existing.location;
            const updated = await this.inventoryRepository.save(existing);
            console.log(`✅ [InventoryService] Inventory updated with ID: ${updated.id}`);
            return this.findOne(updated.id);
        }
        try {
            const inventory = this.inventoryRepository.create({
                store_id: createInventoryDto.store_id,
                part_id: createInventoryDto.part_id,
                quantity: createInventoryDto.quantity || 0,
                min_stock_level: createInventoryDto.min_stock_level || 0,
                location: createInventoryDto.location || null,
            });
            const savedInventory = await this.inventoryRepository.save(inventory);
            console.log(`✅ [InventoryService] Inventory created with ID: ${savedInventory.id}`);
            return this.findOne(savedInventory.id);
        }
        catch (error) {
            console.error('❌ [InventoryService] Error creating inventory:', error);
            throw error;
        }
    }
    async update(id, updateInventoryDto) {
        console.log(`📦 [InventoryService] Updating inventory with ID: ${id}`);
        const inventory = await this.findOne(id);
        Object.assign(inventory, updateInventoryDto);
        const updatedInventory = await this.inventoryRepository.save(inventory);
        console.log(`✅ [InventoryService] Inventory updated: ${updatedInventory.id}`);
        return this.findOne(updatedInventory.id);
    }
    async recordTransaction(transactionDto) {
        console.log('📦 [InventoryService] Recording inventory transaction');
        return await this.dataSource.transaction(async (manager) => {
            let inventory = await manager.findOne(inventory_entity_1.Inventory, {
                where: {
                    store_id: transactionDto.store_id,
                    part_id: transactionDto.part_id,
                },
            });
            const previousQuantity = inventory ? inventory.quantity : 0;
            let newQuantity = previousQuantity;
            switch (transactionDto.transaction_type) {
                case inventory_transaction_dto_1.TransactionType.IN:
                case inventory_transaction_dto_1.TransactionType.TRANSFER_IN:
                    newQuantity = previousQuantity + transactionDto.quantity;
                    break;
                case inventory_transaction_dto_1.TransactionType.OUT:
                case inventory_transaction_dto_1.TransactionType.TRANSFER_OUT:
                    newQuantity = Math.max(0, previousQuantity - transactionDto.quantity);
                    break;
                case inventory_transaction_dto_1.TransactionType.ADJUSTMENT:
                    newQuantity = transactionDto.quantity;
                    break;
            }
            if (!inventory) {
                inventory = manager.create(inventory_entity_1.Inventory, {
                    store_id: transactionDto.store_id,
                    part_id: transactionDto.part_id,
                    quantity: newQuantity,
                });
            }
            else {
                inventory.quantity = newQuantity;
            }
            const savedInventory = await manager.save(inventory_entity_1.Inventory, inventory);
            const ledger = manager.create(inventory_ledger_entity_1.InventoryLedger, {
                inventory_id: savedInventory.id,
                store_id: transactionDto.store_id,
                part_id: transactionDto.part_id,
                transaction_type: transactionDto.transaction_type,
                quantity: transactionDto.quantity,
                previous_quantity: previousQuantity,
                new_quantity: newQuantity,
                reference_number: transactionDto.reference_number || null,
                notes: transactionDto.notes || null,
                created_by: transactionDto.created_by || null,
            });
            const savedLedger = await manager.save(inventory_ledger_entity_1.InventoryLedger, ledger);
            console.log(`✅ [InventoryService] Transaction recorded: ${transactionDto.transaction_type} ${transactionDto.quantity} units`);
            const inventoryWithRelations = await manager.findOne(inventory_entity_1.Inventory, {
                where: { id: savedInventory.id },
                relations: ['store', 'part'],
            });
            return {
                inventory: inventoryWithRelations,
                ledger: savedLedger,
            };
        });
    }
    async findLedgerByPart(partId) {
        return this.inventoryLedgerRepository.find({
            where: { part_id: partId },
            relations: ['store'],
            order: { created_at: 'DESC' },
        });
    }
    async findLedger() {
        return this.inventoryLedgerRepository.find({
            relations: ['store', 'part'],
            order: { created_at: 'DESC' },
            take: 500,
        });
    }
    async remove(id) {
        console.log(`📦 [InventoryService] Deleting inventory with ID: ${id}`);
        const inventory = await this.findOne(id);
        await this.inventoryRepository.remove(inventory);
        console.log(`✅ [InventoryService] Inventory deleted: ${inventory.id}`);
    }
    async getInventoryByStore() {
        console.log('📦 [InventoryService] Getting inventory grouped by store');
        const inventory = await this.inventoryRepository.find({
            relations: ['store', 'part'],
            order: {
                store_id: 'ASC',
                part_id: 'ASC',
            },
        });
        const groupedByStore = {};
        inventory.forEach((inv) => {
            if (!groupedByStore[inv.store_id]) {
                groupedByStore[inv.store_id] = [];
            }
            groupedByStore[inv.store_id].push(inv);
        });
        return Object.values(groupedByStore).flat();
    }
};
exports.InventoryService = InventoryService;
exports.InventoryService = InventoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(inventory_entity_1.Inventory)),
    __param(1, (0, typeorm_1.InjectRepository)(inventory_ledger_entity_1.InventoryLedger)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], InventoryService);
//# sourceMappingURL=inventory.service.js.map