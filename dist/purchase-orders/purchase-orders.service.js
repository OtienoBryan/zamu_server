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
exports.PurchaseOrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const raw_material_purchase_order_entity_1 = require("../entities/raw-material-purchase-order.entity");
const raw_material_purchase_order_item_entity_1 = require("../entities/raw-material-purchase-order-item.entity");
const raw_material_store_entity_1 = require("../entities/raw-material-store.entity");
const raw_material_store_inventory_entity_1 = require("../entities/raw-material-store-inventory.entity");
const raw_material_inventory_ledger_entity_1 = require("../entities/raw-material-inventory-ledger.entity");
const raw_material_entity_1 = require("../entities/raw-material.entity");
const supplier_entity_1 = require("../entities/supplier.entity");
const supplier_ledger_entity_1 = require("../entities/supplier-ledger.entity");
const chart_of_account_entity_1 = require("../entities/chart-of-account.entity");
const journal_entry_entity_1 = require("../entities/journal-entry.entity");
const journal_entry_line_entity_1 = require("../entities/journal-entry-line.entity");
const RELATIONS = ['supplier', 'store', 'items', 'items.rawMaterial'];
const STOCK_ACCOUNT_NAME = 'Stock';
const PURCHASE_TAX_ACCOUNT_NAME = 'Purchase Tax Control Account';
const ACCOUNTS_PAYABLE_NAME = 'Accounts Payables';
let PurchaseOrdersService = class PurchaseOrdersService {
    purchaseOrderRepository;
    storeRepository;
    supplierRepository;
    rawMaterialRepository;
    dataSource;
    constructor(purchaseOrderRepository, storeRepository, supplierRepository, rawMaterialRepository, dataSource) {
        this.purchaseOrderRepository = purchaseOrderRepository;
        this.storeRepository = storeRepository;
        this.supplierRepository = supplierRepository;
        this.rawMaterialRepository = rawMaterialRepository;
        this.dataSource = dataSource;
    }
    async findAll() {
        return this.purchaseOrderRepository.find({
            relations: RELATIONS,
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const po = await this.purchaseOrderRepository.findOne({
            where: { id },
            relations: RELATIONS,
        });
        if (!po) {
            throw new common_1.NotFoundException(`Purchase order with ID ${id} not found`);
        }
        return po;
    }
    async create(dto) {
        const supplier = await this.supplierRepository.findOne({ where: { id: dto.supplierId } });
        if (!supplier) {
            throw new common_1.NotFoundException(`Supplier with ID ${dto.supplierId} not found`);
        }
        const rawMaterialIds = dto.items.map((i) => i.rawMaterialId);
        const materials = await this.rawMaterialRepository.find({ where: { id: (0, typeorm_2.In)(rawMaterialIds) } });
        const materialMap = new Map(materials.map((m) => [m.id, m]));
        for (const item of dto.items) {
            if (!materialMap.has(item.rawMaterialId)) {
                throw new common_1.NotFoundException(`Raw material with ID ${item.rawMaterialId} not found`);
            }
        }
        return this.dataSource.transaction(async (manager) => {
            const subtotal = dto.items.reduce((sum, i) => sum + i.quantity * i.unitCost, 0);
            const taxRate = dto.taxRate ?? 16;
            const taxAmount = subtotal * (taxRate / 100);
            const totalAmount = subtotal + taxAmount;
            const po = manager.create(raw_material_purchase_order_entity_1.RawMaterialPurchaseOrder, {
                supplierId: dto.supplierId,
                status: 'pending',
                subtotal,
                taxRate,
                taxAmount,
                totalAmount,
            });
            const savedPo = await manager.save(raw_material_purchase_order_entity_1.RawMaterialPurchaseOrder, po);
            const items = dto.items.map((i) => manager.create(raw_material_purchase_order_item_entity_1.RawMaterialPurchaseOrderItem, {
                purchaseOrderId: savedPo.id,
                rawMaterialId: i.rawMaterialId,
                quantity: i.quantity,
                unitCost: i.unitCost,
                totalCost: i.quantity * i.unitCost,
            }));
            await manager.save(raw_material_purchase_order_item_entity_1.RawMaterialPurchaseOrderItem, items);
            const withRelations = await manager.findOne(raw_material_purchase_order_entity_1.RawMaterialPurchaseOrder, {
                where: { id: savedPo.id },
                relations: RELATIONS,
            });
            return withRelations;
        });
    }
    async receive(id, dto, createdBy) {
        const po = await this.findOne(id);
        if (po.status !== 'pending') {
            throw new common_1.ConflictException(`Purchase order is already ${po.status} and cannot be received`);
        }
        const store = await this.storeRepository.findOne({ where: { id: dto.storeId } });
        if (!store) {
            throw new common_1.NotFoundException(`Store with ID ${dto.storeId} not found`);
        }
        const receivedByItemId = new Map(dto.items.map((i) => [i.id, i.quantity]));
        for (const item of po.items) {
            if (!receivedByItemId.has(item.id)) {
                throw new common_1.BadRequestException(`Missing received quantity for item ${item.id} (${item.rawMaterial?.name ?? ''})`.trim());
            }
        }
        return this.dataSource.transaction(async (manager) => {
            for (const item of po.items) {
                const receivedQuantity = receivedByItemId.get(item.id);
                await manager.update(raw_material_purchase_order_item_entity_1.RawMaterialPurchaseOrderItem, item.id, { receivedQuantity });
                if (receivedQuantity <= 0)
                    continue;
                let inventory = await manager.findOne(raw_material_store_inventory_entity_1.RawMaterialStoreInventory, {
                    where: { storeId: dto.storeId, rawMaterialId: item.rawMaterialId },
                });
                const previousQuantity = inventory ? Number(inventory.quantity) : 0;
                const newQuantity = previousQuantity + receivedQuantity;
                if (!inventory) {
                    inventory = manager.create(raw_material_store_inventory_entity_1.RawMaterialStoreInventory, {
                        storeId: dto.storeId,
                        rawMaterialId: item.rawMaterialId,
                        quantity: newQuantity,
                    });
                }
                else {
                    inventory.quantity = newQuantity;
                }
                await manager.save(raw_material_store_inventory_entity_1.RawMaterialStoreInventory, inventory);
                const variance = receivedQuantity - Number(item.quantity);
                const notes = variance === 0
                    ? `Received from PO-${po.id}`
                    : `Received ${receivedQuantity} of ${item.quantity} ordered from PO-${po.id} (${variance > 0 ? '+' : ''}${variance})`;
                const ledgerEntry = manager.create(raw_material_inventory_ledger_entity_1.RawMaterialInventoryLedger, {
                    storeId: dto.storeId,
                    rawMaterialId: item.rawMaterialId,
                    purchaseOrderId: po.id,
                    transactionType: 'purchase_receipt',
                    quantity: receivedQuantity,
                    previousQuantity,
                    newQuantity,
                    notes,
                });
                await manager.save(raw_material_inventory_ledger_entity_1.RawMaterialInventoryLedger, ledgerEntry);
                await manager.update(raw_material_entity_1.RawMaterial, item.rawMaterialId, { cost: item.unitCost });
            }
            const supplier = await manager
                .createQueryBuilder(supplier_entity_1.Supplier, 'supplier')
                .setLock('pessimistic_write')
                .where('supplier.id = :id', { id: po.supplierId })
                .getOne();
            if (!supplier) {
                throw new common_1.NotFoundException(`Supplier with ID ${po.supplierId} not found`);
            }
            const previousBalance = Number(supplier.balance);
            const newBalance = previousBalance + Number(po.totalAmount);
            await manager.update(supplier_entity_1.Supplier, po.supplierId, { balance: newBalance });
            const supplierLedgerEntry = manager.create(supplier_ledger_entity_1.SupplierLedger, {
                supplierId: po.supplierId,
                purchaseOrderId: po.id,
                transactionType: 'purchase',
                amount: po.totalAmount,
                previousBalance,
                newBalance,
                notes: `Goods received for PO-${po.id}`,
            });
            await manager.save(supplier_ledger_entity_1.SupplierLedger, supplierLedgerEntry);
            const [stockAccount, taxAccount, payableAccount] = await Promise.all([
                manager.findOne(chart_of_account_entity_1.ChartOfAccount, { where: { accountName: STOCK_ACCOUNT_NAME } }),
                manager.findOne(chart_of_account_entity_1.ChartOfAccount, { where: { accountName: PURCHASE_TAX_ACCOUNT_NAME } }),
                manager.findOne(chart_of_account_entity_1.ChartOfAccount, { where: { accountName: ACCOUNTS_PAYABLE_NAME } }),
            ]);
            if (!stockAccount) {
                throw new common_1.NotFoundException(`Chart of accounts is missing "${STOCK_ACCOUNT_NAME}"`);
            }
            if (!payableAccount) {
                throw new common_1.NotFoundException(`Chart of accounts is missing "${ACCOUNTS_PAYABLE_NAME}"`);
            }
            const taxAmount = Number(po.taxAmount);
            if (taxAmount > 0 && !taxAccount) {
                throw new common_1.NotFoundException(`Chart of accounts is missing "${PURCHASE_TAX_ACCOUNT_NAME}"`);
            }
            const subtotal = Number(po.subtotal);
            const totalAmount = Number(po.totalAmount);
            const supplierName = po.supplier?.name ?? `Supplier #${po.supplierId}`;
            const journalEntry = manager.create(journal_entry_entity_1.JournalEntry, {
                entryNumber: `JE-PO-${po.id}`,
                entryDate: new Date().toISOString().slice(0, 10),
                reference: `PO-${po.id}`,
                description: `Goods received for PO-${po.id} from ${supplierName}`,
                totalDebit: totalAmount,
                totalCredit: totalAmount,
                status: 'posted',
                createdBy,
            });
            const savedJournalEntry = await manager.save(journal_entry_entity_1.JournalEntry, journalEntry);
            const journalLines = [
                manager.create(journal_entry_line_entity_1.JournalEntryLine, {
                    journalEntryId: savedJournalEntry.id,
                    accountId: stockAccount.id,
                    debitAmount: subtotal,
                    creditAmount: 0,
                    description: `Stock received - PO-${po.id}`,
                }),
                ...(taxAmount > 0
                    ? [
                        manager.create(journal_entry_line_entity_1.JournalEntryLine, {
                            journalEntryId: savedJournalEntry.id,
                            accountId: taxAccount.id,
                            debitAmount: taxAmount,
                            creditAmount: 0,
                            description: `Purchase tax - PO-${po.id}`,
                        }),
                    ]
                    : []),
                manager.create(journal_entry_line_entity_1.JournalEntryLine, {
                    journalEntryId: savedJournalEntry.id,
                    accountId: payableAccount.id,
                    debitAmount: 0,
                    creditAmount: totalAmount,
                    description: `Amount payable to ${supplierName} - PO-${po.id}`,
                }),
            ];
            await manager.save(journal_entry_line_entity_1.JournalEntryLine, journalLines);
            await manager.update(raw_material_purchase_order_entity_1.RawMaterialPurchaseOrder, id, {
                status: 'received',
                storeId: dto.storeId,
                receivedAt: new Date(),
                receivedBy: dto.receivedBy,
            });
            const updated = await manager.findOne(raw_material_purchase_order_entity_1.RawMaterialPurchaseOrder, {
                where: { id },
                relations: RELATIONS,
            });
            return updated;
        });
    }
    async cancel(id) {
        const po = await this.findOne(id);
        if (po.status !== 'pending') {
            throw new common_1.ConflictException(`Purchase order is already ${po.status} and cannot be cancelled`);
        }
        await this.purchaseOrderRepository.update(id, { status: 'cancelled' });
        return this.findOne(id);
    }
    async findAllStores() {
        return this.storeRepository.find({ order: { name: 'ASC' } });
    }
    async createStore(dto) {
        const store = this.storeRepository.create({
            name: dto.name,
            location: dto.location ?? null,
        });
        return this.storeRepository.save(store);
    }
    async updateStore(id, dto) {
        const store = await this.storeRepository.findOne({ where: { id } });
        if (!store) {
            throw new common_1.NotFoundException(`Store with ID ${id} not found`);
        }
        Object.assign(store, dto);
        return this.storeRepository.save(store);
    }
    async removeStore(id) {
        const store = await this.storeRepository.findOne({ where: { id } });
        if (!store) {
            throw new common_1.NotFoundException(`Store with ID ${id} not found`);
        }
        const inventoryCount = await this.dataSource
            .getRepository(raw_material_store_inventory_entity_1.RawMaterialStoreInventory)
            .count({ where: { storeId: id } });
        if (inventoryCount > 0) {
            throw new common_1.ConflictException(`Cannot delete "${store.name}" — it still holds inventory for ${inventoryCount} raw material${inventoryCount === 1 ? '' : 's'}.`);
        }
        const purchaseOrderCount = await this.purchaseOrderRepository.count({ where: { storeId: id } });
        if (purchaseOrderCount > 0) {
            throw new common_1.ConflictException(`Cannot delete "${store.name}" — ${purchaseOrderCount} purchase order${purchaseOrderCount === 1 ? '' : 's'} reference it.`);
        }
        await this.storeRepository.remove(store);
    }
    async findAllInventory() {
        return this.dataSource
            .getRepository(raw_material_store_inventory_entity_1.RawMaterialStoreInventory)
            .createQueryBuilder('inventory')
            .leftJoinAndSelect('inventory.rawMaterial', 'rawMaterial')
            .leftJoinAndSelect('inventory.store', 'store')
            .orderBy('rawMaterial.name', 'ASC')
            .addOrderBy('store.name', 'ASC')
            .getMany();
    }
    async findStoreInventory(storeId) {
        return this.dataSource.getRepository(raw_material_store_inventory_entity_1.RawMaterialStoreInventory).find({
            where: { storeId },
            relations: ['rawMaterial', 'store'],
            order: { updatedAt: 'DESC' },
        });
    }
    async findInventoryLedger() {
        return this.dataSource.getRepository(raw_material_inventory_ledger_entity_1.RawMaterialInventoryLedger).find({
            relations: ['store', 'rawMaterial', 'purchaseOrder'],
            order: { createdAt: 'DESC' },
            take: 500,
        });
    }
};
exports.PurchaseOrdersService = PurchaseOrdersService;
exports.PurchaseOrdersService = PurchaseOrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(raw_material_purchase_order_entity_1.RawMaterialPurchaseOrder)),
    __param(1, (0, typeorm_1.InjectRepository)(raw_material_store_entity_1.RawMaterialStore)),
    __param(2, (0, typeorm_1.InjectRepository)(supplier_entity_1.Supplier)),
    __param(3, (0, typeorm_1.InjectRepository)(raw_material_entity_1.RawMaterial)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], PurchaseOrdersService);
//# sourceMappingURL=purchase-orders.service.js.map