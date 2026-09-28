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
exports.PosSalePaymentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const pos_sale_payment_entity_1 = require("../entities/pos-sale-payment.entity");
const pos_sale_entity_1 = require("../entities/pos-sale.entity");
const chart_of_account_entity_1 = require("../entities/chart-of-account.entity");
const journal_entry_entity_1 = require("../entities/journal-entry.entity");
const journal_entry_line_entity_1 = require("../entities/journal-entry-line.entity");
const receipt_entity_1 = require("../entities/receipt.entity");
const RELATIONS = ['paymentAccount'];
const RECEIVABLE_ACCOUNT_NAME = 'Debtors Control Account (POS)';
let PosSalePaymentsService = class PosSalePaymentsService {
    paymentRepository;
    posSaleRepository;
    chartOfAccountRepository;
    dataSource;
    constructor(paymentRepository, posSaleRepository, chartOfAccountRepository, dataSource) {
        this.paymentRepository = paymentRepository;
        this.posSaleRepository = posSaleRepository;
        this.chartOfAccountRepository = chartOfAccountRepository;
        this.dataSource = dataSource;
    }
    async findAll() {
        return this.paymentRepository.find({
            relations: RELATIONS,
            order: { paymentDate: 'DESC' },
        });
    }
    async findForSale(posSaleId) {
        return this.paymentRepository.find({
            where: { posSaleId },
            relations: RELATIONS,
            order: { paymentDate: 'DESC' },
        });
    }
    async create(dto, createdBy) {
        const sale = await this.posSaleRepository.findOne({ where: { id: dto.posSaleId } });
        if (!sale) {
            throw new common_1.NotFoundException(`POS sale with ID ${dto.posSaleId} not found`);
        }
        const paymentAccount = await this.chartOfAccountRepository.findOne({ where: { id: dto.paymentAccountId } });
        if (!paymentAccount) {
            throw new common_1.NotFoundException(`Payment account with ID ${dto.paymentAccountId} not found`);
        }
        const existingPayments = await this.paymentRepository.find({ where: { posSaleId: dto.posSaleId } });
        const alreadyPaid = existingPayments.reduce((sum, p) => sum + Number(p.amount), 0);
        if (alreadyPaid + dto.amount > Number(sale.totalAmount) + 0.004) {
            throw new common_1.BadRequestException(`Payment of ${dto.amount} exceeds the remaining balance of ${(Number(sale.totalAmount) - alreadyPaid).toFixed(2)}`);
        }
        return this.dataSource.transaction(async (manager) => {
            const payment = manager.create(pos_sale_payment_entity_1.PosSalePayment, {
                posSaleId: dto.posSaleId,
                paymentAccountId: dto.paymentAccountId,
                amount: dto.amount,
                paymentDate: dto.paymentDate,
                notes: dto.notes ?? null,
                createdBy,
            });
            const savedPayment = await manager.save(pos_sale_payment_entity_1.PosSalePayment, payment);
            const receivableAccount = await manager.findOne(chart_of_account_entity_1.ChartOfAccount, { where: { accountName: RECEIVABLE_ACCOUNT_NAME } });
            if (!receivableAccount) {
                throw new common_1.NotFoundException(`Chart of accounts is missing "${RECEIVABLE_ACCOUNT_NAME}"`);
            }
            const journalEntry = manager.create(journal_entry_entity_1.JournalEntry, {
                entryNumber: `JE-POSPAY-${savedPayment.id}`,
                entryDate: dto.paymentDate,
                reference: `POS-${dto.posSaleId}`,
                description: `Payment received for POS-${dto.posSaleId}`,
                totalDebit: dto.amount,
                totalCredit: dto.amount,
                status: 'posted',
                createdBy,
            });
            const savedJournalEntry = await manager.save(journal_entry_entity_1.JournalEntry, journalEntry);
            await manager.save(journal_entry_line_entity_1.JournalEntryLine, [
                manager.create(journal_entry_line_entity_1.JournalEntryLine, {
                    journalEntryId: savedJournalEntry.id,
                    accountId: paymentAccount.id,
                    debitAmount: dto.amount,
                    creditAmount: 0,
                    description: `Payment received - POS-${dto.posSaleId}`,
                }),
                manager.create(journal_entry_line_entity_1.JournalEntryLine, {
                    journalEntryId: savedJournalEntry.id,
                    accountId: receivableAccount.id,
                    debitAmount: 0,
                    creditAmount: dto.amount,
                    description: `Settle receivable - POS-${dto.posSaleId}`,
                }),
            ]);
            await manager.save(receipt_entity_1.Receipt, manager.create(receipt_entity_1.Receipt, {
                receiptNumber: `RCPT-${String(savedPayment.id).padStart(6, '0')}`,
                posSalePaymentId: savedPayment.id,
                posSaleId: dto.posSaleId,
                clientId: sale.clientId,
                amount: dto.amount,
                paymentDate: dto.paymentDate,
                paymentMethod: paymentAccount.accountName,
                notes: dto.notes ?? null,
                createdBy,
            }));
            return manager.findOne(pos_sale_payment_entity_1.PosSalePayment, { where: { id: savedPayment.id }, relations: RELATIONS });
        });
    }
    async remove(id) {
        const payment = await this.paymentRepository.findOne({ where: { id } });
        if (!payment) {
            throw new common_1.NotFoundException(`POS sale payment with ID ${id} not found`);
        }
        await this.dataSource.getRepository(receipt_entity_1.Receipt).delete({ posSalePaymentId: id });
        await this.paymentRepository.remove(payment);
    }
};
exports.PosSalePaymentsService = PosSalePaymentsService;
exports.PosSalePaymentsService = PosSalePaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(pos_sale_payment_entity_1.PosSalePayment)),
    __param(1, (0, typeorm_1.InjectRepository)(pos_sale_entity_1.PosSale)),
    __param(2, (0, typeorm_1.InjectRepository)(chart_of_account_entity_1.ChartOfAccount)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], PosSalePaymentsService);
//# sourceMappingURL=pos-sale-payments.service.js.map