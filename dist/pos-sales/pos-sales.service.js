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
exports.PosSalesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const pos_sale_entity_1 = require("../entities/pos-sale.entity");
const pos_sale_item_entity_1 = require("../entities/pos-sale-item.entity");
const finished_product_entity_1 = require("../entities/finished-product.entity");
const client_record_entity_1 = require("../entities/client-record.entity");
const raw_material_store_entity_1 = require("../entities/raw-material-store.entity");
const finished_product_store_inventory_entity_1 = require("../entities/finished-product-store-inventory.entity");
const finished_product_inventory_ledger_entity_1 = require("../entities/finished-product-inventory-ledger.entity");
const chart_of_account_entity_1 = require("../entities/chart-of-account.entity");
const journal_entry_entity_1 = require("../entities/journal-entry.entity");
const journal_entry_line_entity_1 = require("../entities/journal-entry-line.entity");
const RELATIONS = ['items', 'items.product', 'client', 'store', 'postedByStaff'];
const RECEIVABLE_ACCOUNT_NAME = 'Debtors Control Account (POS)';
const REVENUE_ACCOUNT_NAME = 'Sales Revenue';
const OUTPUT_TAX_ACCOUNT_NAME = 'Output Tax Account';
const COGS_ACCOUNT_NAME = 'Cost of Goods Sold - Finished Products';
const STOCK_ACCOUNT_NAME = 'Stock';
let PosSalesService = class PosSalesService {
    posSaleRepository;
    productRepository;
    clientRepository;
    storeRepository;
    dataSource;
    constructor(posSaleRepository, productRepository, clientRepository, storeRepository, dataSource) {
        this.posSaleRepository = posSaleRepository;
        this.productRepository = productRepository;
        this.clientRepository = clientRepository;
        this.storeRepository = storeRepository;
        this.dataSource = dataSource;
    }
    redactStaff(sale) {
        if (sale.postedByStaff) {
            sale.postedByStaff = { id: sale.postedByStaff.id, name: sale.postedByStaff.name };
        }
        return sale;
    }
    async findAll() {
        const sales = await this.posSaleRepository.find({
            relations: RELATIONS,
            order: { createdAt: 'DESC' },
        });
        return sales.map((s) => this.redactStaff(s));
    }
    async findOne(id) {
        const sale = await this.posSaleRepository.findOne({ where: { id }, relations: RELATIONS });
        if (!sale) {
            throw new common_1.NotFoundException(`POS sale with ID ${id} not found`);
        }
        return this.redactStaff(sale);
    }
    async create(dto, createdBy) {
        const productIds = dto.items.map((i) => i.productId);
        const [products, client, store] = await Promise.all([
            this.productRepository.find({ where: { id: (0, typeorm_2.In)(productIds) } }),
            dto.clientId != null ? this.clientRepository.findOne({ where: { id: dto.clientId } }) : Promise.resolve(null),
            dto.storeId != null ? this.storeRepository.findOne({ where: { id: dto.storeId } }) : Promise.resolve(null),
        ]);
        const productMap = new Map(products.map((p) => [p.id, p]));
        for (const item of dto.items) {
            if (!productMap.has(item.productId)) {
                throw new common_1.NotFoundException(`Finished product with ID ${item.productId} not found`);
            }
        }
        if (dto.clientId != null && !client) {
            throw new common_1.NotFoundException(`Client with ID ${dto.clientId} not found`);
        }
        if (dto.storeId != null && !store) {
            throw new common_1.NotFoundException(`Store with ID ${dto.storeId} not found`);
        }
        return this.dataSource.transaction(async (manager) => {
            const subtotal = dto.items.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0);
            const taxRate = dto.taxRate ?? 16;
            const taxAmount = subtotal * (taxRate / 100);
            const totalAmount = subtotal + taxAmount;
            const totalCost = dto.items.reduce((sum, i) => sum + i.quantity * Number(productMap.get(i.productId).productionCost), 0);
            const sale = manager.create(pos_sale_entity_1.PosSale, {
                clientId: dto.clientId ?? null,
                storeId: dto.storeId ?? null,
                subtotal,
                taxRate,
                taxAmount,
                totalAmount,
                createdBy,
            });
            const savedSale = await manager.save(pos_sale_entity_1.PosSale, sale);
            const items = dto.items.map((i) => manager.create(pos_sale_item_entity_1.PosSaleItem, {
                posSaleId: savedSale.id,
                productId: i.productId,
                quantity: i.quantity,
                unitPrice: i.unitPrice,
                totalPrice: i.quantity * i.unitPrice,
            }));
            await manager.save(pos_sale_item_entity_1.PosSaleItem, items);
            if (store) {
                const existingInventory = await manager.find(finished_product_store_inventory_entity_1.FinishedProductStoreInventory, {
                    where: { storeId: store.id, productId: (0, typeorm_2.In)(productIds) },
                });
                const inventoryByProduct = new Map(existingInventory.map((row) => [row.productId, row]));
                const ledgerEntries = [];
                for (const item of dto.items) {
                    const inventory = inventoryByProduct.get(item.productId);
                    const previousQuantity = inventory ? Number(inventory.quantity) : 0;
                    if (previousQuantity < item.quantity) {
                        const productName = productMap.get(item.productId).name;
                        throw new common_1.BadRequestException(`Not enough "${productName}" in stock at ${store.name} — only ${previousQuantity} available, ${item.quantity} requested`);
                    }
                    const newQuantity = previousQuantity - item.quantity;
                    if (!inventory) {
                        const created = manager.create(finished_product_store_inventory_entity_1.FinishedProductStoreInventory, {
                            storeId: store.id,
                            productId: item.productId,
                            quantity: newQuantity,
                        });
                        inventoryByProduct.set(item.productId, created);
                    }
                    else {
                        inventory.quantity = newQuantity;
                    }
                    ledgerEntries.push(manager.create(finished_product_inventory_ledger_entity_1.FinishedProductInventoryLedger, {
                        storeId: store.id,
                        productId: item.productId,
                        transactionType: 'sale_issue',
                        quantity: item.quantity,
                        previousQuantity,
                        newQuantity,
                        notes: `POS-${savedSale.id}`,
                        createdBy,
                    }));
                }
                await manager.save(finished_product_store_inventory_entity_1.FinishedProductStoreInventory, Array.from(inventoryByProduct.values()));
                await manager.save(finished_product_inventory_ledger_entity_1.FinishedProductInventoryLedger, ledgerEntries);
            }
            const accountNames = [RECEIVABLE_ACCOUNT_NAME, REVENUE_ACCOUNT_NAME, OUTPUT_TAX_ACCOUNT_NAME, COGS_ACCOUNT_NAME, STOCK_ACCOUNT_NAME];
            const accounts = await manager.find(chart_of_account_entity_1.ChartOfAccount, { where: { accountName: (0, typeorm_2.In)(accountNames) } });
            const accountByName = new Map(accounts.map((a) => [a.accountName, a]));
            const receivableAccount = accountByName.get(RECEIVABLE_ACCOUNT_NAME);
            const revenueAccount = accountByName.get(REVENUE_ACCOUNT_NAME);
            const taxAccount = accountByName.get(OUTPUT_TAX_ACCOUNT_NAME);
            const cogsAccount = accountByName.get(COGS_ACCOUNT_NAME);
            const stockAccount = accountByName.get(STOCK_ACCOUNT_NAME);
            if (!receivableAccount) {
                throw new common_1.NotFoundException(`Chart of accounts is missing "${RECEIVABLE_ACCOUNT_NAME}"`);
            }
            if (!revenueAccount) {
                throw new common_1.NotFoundException(`Chart of accounts is missing "${REVENUE_ACCOUNT_NAME}"`);
            }
            if (taxAmount > 0 && !taxAccount) {
                throw new common_1.NotFoundException(`Chart of accounts is missing "${OUTPUT_TAX_ACCOUNT_NAME}"`);
            }
            if (totalCost > 0 && !cogsAccount) {
                throw new common_1.NotFoundException(`Chart of accounts is missing "${COGS_ACCOUNT_NAME}"`);
            }
            if (totalCost > 0 && !stockAccount) {
                throw new common_1.NotFoundException(`Chart of accounts is missing "${STOCK_ACCOUNT_NAME}"`);
            }
            const clientName = client?.name ?? (dto.clientId != null ? `Client #${dto.clientId}` : 'Walk-in customer');
            const journalEntry = manager.create(journal_entry_entity_1.JournalEntry, {
                entryNumber: `JE-POS-${savedSale.id}`,
                entryDate: new Date().toISOString().slice(0, 10),
                reference: `POS-${savedSale.id}`,
                description: `POS sale to ${clientName}`,
                totalDebit: totalAmount + totalCost,
                totalCredit: totalAmount + totalCost,
                status: 'posted',
                createdBy,
            });
            const savedJournalEntry = await manager.save(journal_entry_entity_1.JournalEntry, journalEntry);
            const journalLines = [
                manager.create(journal_entry_line_entity_1.JournalEntryLine, {
                    journalEntryId: savedJournalEntry.id,
                    accountId: receivableAccount.id,
                    debitAmount: totalAmount,
                    creditAmount: 0,
                    description: `Amount receivable from ${clientName} - POS-${savedSale.id}`,
                }),
                manager.create(journal_entry_line_entity_1.JournalEntryLine, {
                    journalEntryId: savedJournalEntry.id,
                    accountId: revenueAccount.id,
                    debitAmount: 0,
                    creditAmount: subtotal,
                    description: `Sales revenue - POS-${savedSale.id}`,
                }),
                ...(taxAmount > 0
                    ? [
                        manager.create(journal_entry_line_entity_1.JournalEntryLine, {
                            journalEntryId: savedJournalEntry.id,
                            accountId: taxAccount.id,
                            debitAmount: 0,
                            creditAmount: taxAmount,
                            description: `Output tax - POS-${savedSale.id}`,
                        }),
                    ]
                    : []),
                ...(totalCost > 0
                    ? [
                        manager.create(journal_entry_line_entity_1.JournalEntryLine, {
                            journalEntryId: savedJournalEntry.id,
                            accountId: cogsAccount.id,
                            debitAmount: totalCost,
                            creditAmount: 0,
                            description: `Cost of goods sold - POS-${savedSale.id}`,
                        }),
                        manager.create(journal_entry_line_entity_1.JournalEntryLine, {
                            journalEntryId: savedJournalEntry.id,
                            accountId: stockAccount.id,
                            debitAmount: 0,
                            creditAmount: totalCost,
                            description: `Finished goods issued - POS-${savedSale.id}`,
                        }),
                    ]
                    : []),
            ];
            await manager.save(journal_entry_line_entity_1.JournalEntryLine, journalLines);
            savedSale.items = items;
            return savedSale;
        });
    }
};
exports.PosSalesService = PosSalesService;
exports.PosSalesService = PosSalesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(pos_sale_entity_1.PosSale)),
    __param(1, (0, typeorm_1.InjectRepository)(finished_product_entity_1.FinishedProduct)),
    __param(2, (0, typeorm_1.InjectRepository)(client_record_entity_1.ClientRecord)),
    __param(3, (0, typeorm_1.InjectRepository)(raw_material_store_entity_1.RawMaterialStore)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], PosSalesService);
//# sourceMappingURL=pos-sales.service.js.map