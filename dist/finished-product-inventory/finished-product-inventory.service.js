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
exports.FinishedProductInventoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const finished_product_store_inventory_entity_1 = require("../entities/finished-product-store-inventory.entity");
const finished_product_inventory_ledger_entity_1 = require("../entities/finished-product-inventory-ledger.entity");
const raw_material_store_entity_1 = require("../entities/raw-material-store.entity");
const finished_product_entity_1 = require("../entities/finished-product.entity");
let FinishedProductInventoryService = class FinishedProductInventoryService {
    inventoryRepository;
    ledgerRepository;
    storeRepository;
    productRepository;
    dataSource;
    constructor(inventoryRepository, ledgerRepository, storeRepository, productRepository, dataSource) {
        this.inventoryRepository = inventoryRepository;
        this.ledgerRepository = ledgerRepository;
        this.storeRepository = storeRepository;
        this.productRepository = productRepository;
        this.dataSource = dataSource;
    }
    async findAllInventory() {
        return this.inventoryRepository.find({
            relations: ['store', 'product'],
            order: { id: 'ASC' },
        });
    }
    async findLedger(productId) {
        return this.ledgerRepository.find({
            where: productId != null ? { productId } : {},
            relations: ['store', 'product'],
            order: { createdAt: 'DESC' },
        });
    }
    async applyMovement(manager, storeId, productId, transactionType, quantity, newQuantity, notes, createdBy) {
        let inventory = await manager.findOne(finished_product_store_inventory_entity_1.FinishedProductStoreInventory, { where: { storeId, productId } });
        const previousQuantity = inventory ? Number(inventory.quantity) : 0;
        if (!inventory) {
            inventory = manager.create(finished_product_store_inventory_entity_1.FinishedProductStoreInventory, { storeId, productId, quantity: newQuantity });
        }
        else {
            inventory.quantity = newQuantity;
        }
        await manager.save(finished_product_store_inventory_entity_1.FinishedProductStoreInventory, inventory);
        const ledgerEntry = manager.create(finished_product_inventory_ledger_entity_1.FinishedProductInventoryLedger, {
            storeId,
            productId,
            transactionType,
            quantity,
            previousQuantity,
            newQuantity,
            notes,
            createdBy,
        });
        const saved = await manager.save(finished_product_inventory_ledger_entity_1.FinishedProductInventoryLedger, ledgerEntry);
        return saved.id;
    }
    async createAdjustment(dto, createdBy) {
        const store = await this.storeRepository.findOne({ where: { id: dto.storeId } });
        if (!store) {
            throw new common_1.NotFoundException(`Store with ID ${dto.storeId} not found`);
        }
        const product = await this.productRepository.findOne({ where: { id: dto.productId } });
        if (!product) {
            throw new common_1.NotFoundException(`Finished product with ID ${dto.productId} not found`);
        }
        const ledgerId = await this.dataSource.transaction(async (manager) => {
            const inventory = await manager.findOne(finished_product_store_inventory_entity_1.FinishedProductStoreInventory, {
                where: { storeId: dto.storeId, productId: dto.productId },
            });
            const previousQuantity = inventory ? Number(inventory.quantity) : 0;
            const newQuantity = dto.direction === 'in' ? previousQuantity + dto.quantity : previousQuantity - dto.quantity;
            if (newQuantity < 0) {
                throw new common_1.BadRequestException(`Cannot remove ${dto.quantity} — only ${previousQuantity} in stock at ${store.name}`);
            }
            return this.applyMovement(manager, dto.storeId, dto.productId, dto.direction === 'in' ? 'adjustment_in' : 'adjustment_out', dto.quantity, newQuantity, dto.notes ?? null, createdBy);
        });
        return this.ledgerRepository.findOne({ where: { id: ledgerId }, relations: ['store', 'product'] });
    }
    async setQuantity(dto, createdBy) {
        const store = await this.storeRepository.findOne({ where: { id: dto.storeId } });
        if (!store) {
            throw new common_1.NotFoundException(`Store with ID ${dto.storeId} not found`);
        }
        const product = await this.productRepository.findOne({ where: { id: dto.productId } });
        if (!product) {
            throw new common_1.NotFoundException(`Finished product with ID ${dto.productId} not found`);
        }
        const ledgerId = await this.dataSource.transaction(async (manager) => {
            const inventory = await manager.findOne(finished_product_store_inventory_entity_1.FinishedProductStoreInventory, {
                where: { storeId: dto.storeId, productId: dto.productId },
            });
            const previousQuantity = inventory ? Number(inventory.quantity) : 0;
            const delta = dto.quantity - previousQuantity;
            if (delta === 0) {
                throw new common_1.BadRequestException('New quantity matches the current balance — nothing to update');
            }
            return this.applyMovement(manager, dto.storeId, dto.productId, delta > 0 ? 'adjustment_in' : 'adjustment_out', Math.abs(delta), dto.quantity, dto.notes ?? 'Stock count update', createdBy);
        });
        return this.ledgerRepository.findOne({ where: { id: ledgerId }, relations: ['store', 'product'] });
    }
    async transfer(dto, createdBy) {
        if (dto.fromStoreId === dto.toStoreId) {
            throw new common_1.BadRequestException('Source and destination stores must be different');
        }
        const [fromStore, toStore, product] = await Promise.all([
            this.storeRepository.findOne({ where: { id: dto.fromStoreId } }),
            this.storeRepository.findOne({ where: { id: dto.toStoreId } }),
            this.productRepository.findOne({ where: { id: dto.productId } }),
        ]);
        if (!fromStore) {
            throw new common_1.NotFoundException(`Store with ID ${dto.fromStoreId} not found`);
        }
        if (!toStore) {
            throw new common_1.NotFoundException(`Store with ID ${dto.toStoreId} not found`);
        }
        if (!product) {
            throw new common_1.NotFoundException(`Finished product with ID ${dto.productId} not found`);
        }
        const { fromLedgerId, toLedgerId } = await this.dataSource.transaction(async (manager) => {
            const fromInventory = await manager.findOne(finished_product_store_inventory_entity_1.FinishedProductStoreInventory, {
                where: { storeId: dto.fromStoreId, productId: dto.productId },
            });
            const fromPrevious = fromInventory ? Number(fromInventory.quantity) : 0;
            if (fromPrevious < dto.quantity) {
                throw new common_1.BadRequestException(`Cannot transfer ${dto.quantity} — only ${fromPrevious} in stock at ${fromStore.name}`);
            }
            const fromLedgerId = await this.applyMovement(manager, dto.fromStoreId, dto.productId, 'transfer_out', dto.quantity, fromPrevious - dto.quantity, dto.notes ? `${dto.notes} (to ${toStore.name})` : `Transferred to ${toStore.name}`, createdBy);
            const toInventory = await manager.findOne(finished_product_store_inventory_entity_1.FinishedProductStoreInventory, {
                where: { storeId: dto.toStoreId, productId: dto.productId },
            });
            const toPrevious = toInventory ? Number(toInventory.quantity) : 0;
            const toLedgerId = await this.applyMovement(manager, dto.toStoreId, dto.productId, 'transfer_in', dto.quantity, toPrevious + dto.quantity, dto.notes ? `${dto.notes} (from ${fromStore.name})` : `Transferred from ${fromStore.name}`, createdBy);
            return { fromLedgerId, toLedgerId };
        });
        const [from, to] = await Promise.all([
            this.ledgerRepository.findOne({ where: { id: fromLedgerId }, relations: ['store', 'product'] }),
            this.ledgerRepository.findOne({ where: { id: toLedgerId }, relations: ['store', 'product'] }),
        ]);
        return { from: from, to: to };
    }
};
exports.FinishedProductInventoryService = FinishedProductInventoryService;
exports.FinishedProductInventoryService = FinishedProductInventoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(finished_product_store_inventory_entity_1.FinishedProductStoreInventory)),
    __param(1, (0, typeorm_1.InjectRepository)(finished_product_inventory_ledger_entity_1.FinishedProductInventoryLedger)),
    __param(2, (0, typeorm_1.InjectRepository)(raw_material_store_entity_1.RawMaterialStore)),
    __param(3, (0, typeorm_1.InjectRepository)(finished_product_entity_1.FinishedProduct)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], FinishedProductInventoryService);
//# sourceMappingURL=finished-product-inventory.service.js.map