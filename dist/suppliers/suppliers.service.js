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
exports.SuppliersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const supplier_entity_1 = require("../entities/supplier.entity");
const supplier_ledger_entity_1 = require("../entities/supplier-ledger.entity");
const chart_of_account_entity_1 = require("../entities/chart-of-account.entity");
const journal_entry_entity_1 = require("../entities/journal-entry.entity");
const journal_entry_line_entity_1 = require("../entities/journal-entry-line.entity");
const ACCOUNTS_PAYABLE_NAME = 'Accounts Payables';
let SuppliersService = class SuppliersService {
    supplierRepository;
    supplierLedgerRepository;
    dataSource;
    constructor(supplierRepository, supplierLedgerRepository, dataSource) {
        this.supplierRepository = supplierRepository;
        this.supplierLedgerRepository = supplierLedgerRepository;
        this.dataSource = dataSource;
    }
    async findAll() {
        return this.supplierRepository.find({ order: { name: 'ASC' } });
    }
    async findOne(id) {
        const supplier = await this.supplierRepository.findOne({ where: { id } });
        if (!supplier) {
            throw new common_1.NotFoundException(`Supplier with ID ${id} not found`);
        }
        return supplier;
    }
    async create(dto) {
        const supplier = this.supplierRepository.create({
            name: dto.name,
            mobileNumber: dto.mobileNumber ?? null,
            email: dto.email ?? null,
            location: dto.location ?? null,
            paymentTermsDays: dto.paymentTermsDays ?? 30,
            creditLimit: dto.creditLimit ?? 0,
            taxPin: dto.taxPin ?? null,
        });
        return this.supplierRepository.save(supplier);
    }
    async update(id, dto) {
        const supplier = await this.findOne(id);
        Object.assign(supplier, dto);
        return this.supplierRepository.save(supplier);
    }
    async remove(id) {
        const supplier = await this.findOne(id);
        await this.supplierRepository.remove(supplier);
    }
    async findLedger(id) {
        await this.findOne(id);
        return this.supplierLedgerRepository.find({
            where: { supplierId: id },
            relations: ['purchaseOrder'],
            order: { createdAt: 'DESC' },
        });
    }
    async getAgingReport() {
        const suppliers = await this.supplierRepository.find({
            where: { balance: (0, typeorm_2.MoreThan)(0) },
            order: { name: 'ASC' },
        });
        const now = Date.now();
        const rows = [];
        for (const supplier of suppliers) {
            const entries = await this.supplierLedgerRepository.find({
                where: { supplierId: supplier.id },
                order: { createdAt: 'ASC' },
            });
            const openLots = [];
            for (const entry of entries) {
                const previous = Number(entry.previousBalance);
                const next = Number(entry.newBalance);
                const delta = Math.abs(next - previous);
                if (delta === 0)
                    continue;
                if (next > previous) {
                    openLots.push({ date: entry.createdAt, amount: delta });
                }
                else {
                    let remaining = delta;
                    while (remaining > 0.005 && openLots.length > 0) {
                        const lot = openLots[0];
                        if (lot.amount <= remaining) {
                            remaining -= lot.amount;
                            openLots.shift();
                        }
                        else {
                            lot.amount -= remaining;
                            remaining = 0;
                        }
                    }
                }
            }
            let current = 0;
            let days31to60 = 0;
            let days61to90 = 0;
            let over90 = 0;
            for (const lot of openLots) {
                const ageDays = Math.floor((now - lot.date.getTime()) / (1000 * 60 * 60 * 24));
                if (ageDays <= 30)
                    current += lot.amount;
                else if (ageDays <= 60)
                    days31to60 += lot.amount;
                else if (ageDays <= 90)
                    days61to90 += lot.amount;
                else
                    over90 += lot.amount;
            }
            rows.push({
                supplierId: supplier.id,
                supplierName: supplier.name,
                current,
                days31to60,
                days61to90,
                over90,
                totalOutstanding: current + days31to60 + days61to90 + over90,
            });
        }
        return rows;
    }
    async createPayment(supplierId, dto, createdBy) {
        const supplier = await this.findOne(supplierId);
        const previousBalance = Number(supplier.balance);
        if (dto.amount > previousBalance + 0.004) {
            throw new common_1.BadRequestException(`Payment of ${dto.amount} exceeds the outstanding balance of ${previousBalance.toFixed(2)}`);
        }
        const ledgerId = await this.dataSource.transaction(async (manager) => {
            const lockedSupplier = await manager
                .createQueryBuilder(supplier_entity_1.Supplier, 'supplier')
                .setLock('pessimistic_write')
                .where('supplier.id = :id', { id: supplierId })
                .getOne();
            if (!lockedSupplier) {
                throw new common_1.NotFoundException(`Supplier with ID ${supplierId} not found`);
            }
            const paymentAccount = await manager.findOne(chart_of_account_entity_1.ChartOfAccount, { where: { id: dto.paymentAccountId } });
            if (!paymentAccount) {
                throw new common_1.NotFoundException(`Payment account with ID ${dto.paymentAccountId} not found`);
            }
            const payableAccount = await manager.findOne(chart_of_account_entity_1.ChartOfAccount, { where: { accountName: ACCOUNTS_PAYABLE_NAME } });
            if (!payableAccount) {
                throw new common_1.NotFoundException(`Chart of accounts is missing "${ACCOUNTS_PAYABLE_NAME}"`);
            }
            const lockedPreviousBalance = Number(lockedSupplier.balance);
            const newBalance = lockedPreviousBalance - dto.amount;
            if (newBalance < -0.004) {
                throw new common_1.BadRequestException(`Payment of ${dto.amount} exceeds the outstanding balance of ${lockedPreviousBalance.toFixed(2)}`);
            }
            await manager.update(supplier_entity_1.Supplier, supplierId, { balance: newBalance });
            const ledgerEntry = manager.create(supplier_ledger_entity_1.SupplierLedger, {
                supplierId,
                purchaseOrderId: dto.purchaseOrderId ?? null,
                transactionType: 'payment',
                amount: dto.amount,
                previousBalance: lockedPreviousBalance,
                newBalance,
                notes: dto.notes ?? null,
                paymentAccountId: dto.paymentAccountId,
                createdBy,
            });
            const savedLedgerEntry = await manager.save(supplier_ledger_entity_1.SupplierLedger, ledgerEntry);
            const poSuffix = dto.purchaseOrderId ? ` - PO-${dto.purchaseOrderId}` : '';
            const journalEntry = manager.create(journal_entry_entity_1.JournalEntry, {
                entryNumber: `JE-SUPPAY-${savedLedgerEntry.id}`,
                entryDate: dto.paymentDate,
                reference: dto.purchaseOrderId ? `PO-${dto.purchaseOrderId}` : `SUP-${supplierId}`,
                description: `Payment to ${supplier.name}${poSuffix}`,
                totalDebit: dto.amount,
                totalCredit: dto.amount,
                status: 'posted',
                createdBy,
            });
            const savedJournalEntry = await manager.save(journal_entry_entity_1.JournalEntry, journalEntry);
            await manager.save(journal_entry_line_entity_1.JournalEntryLine, [
                manager.create(journal_entry_line_entity_1.JournalEntryLine, {
                    journalEntryId: savedJournalEntry.id,
                    accountId: payableAccount.id,
                    debitAmount: dto.amount,
                    creditAmount: 0,
                    description: `Settle payable - ${supplier.name}${poSuffix}`,
                }),
                manager.create(journal_entry_line_entity_1.JournalEntryLine, {
                    journalEntryId: savedJournalEntry.id,
                    accountId: paymentAccount.id,
                    debitAmount: 0,
                    creditAmount: dto.amount,
                    description: `Payment to ${supplier.name}${poSuffix}`,
                }),
            ]);
            return savedLedgerEntry.id;
        });
        return this.supplierLedgerRepository.findOne({
            where: { id: ledgerId },
            relations: ['purchaseOrder', 'paymentAccount'],
        });
    }
};
exports.SuppliersService = SuppliersService;
exports.SuppliersService = SuppliersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(supplier_entity_1.Supplier)),
    __param(1, (0, typeorm_1.InjectRepository)(supplier_ledger_entity_1.SupplierLedger)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], SuppliersService);
//# sourceMappingURL=suppliers.service.js.map