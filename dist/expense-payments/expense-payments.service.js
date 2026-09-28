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
exports.ExpensePaymentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const expense_payment_entity_1 = require("../entities/expense-payment.entity");
const expense_entity_1 = require("../entities/expense.entity");
const chart_of_account_entity_1 = require("../entities/chart-of-account.entity");
const journal_entry_entity_1 = require("../entities/journal-entry.entity");
const journal_entry_line_entity_1 = require("../entities/journal-entry-line.entity");
const RELATIONS = ['paymentAccount'];
const ACCOUNTS_PAYABLE_NAME = 'Accounts Payables';
let ExpensePaymentsService = class ExpensePaymentsService {
    expensePaymentRepository;
    expenseRepository;
    chartOfAccountRepository;
    dataSource;
    constructor(expensePaymentRepository, expenseRepository, chartOfAccountRepository, dataSource) {
        this.expensePaymentRepository = expensePaymentRepository;
        this.expenseRepository = expenseRepository;
        this.chartOfAccountRepository = chartOfAccountRepository;
        this.dataSource = dataSource;
    }
    async findAll() {
        return this.expensePaymentRepository.find({
            relations: RELATIONS,
            order: { paymentDate: 'DESC' },
        });
    }
    async findForExpense(expenseId) {
        return this.expensePaymentRepository.find({
            where: { expenseId },
            relations: RELATIONS,
            order: { paymentDate: 'DESC' },
        });
    }
    async create(dto, createdBy) {
        const expense = await this.expenseRepository.findOne({ where: { id: dto.expenseId } });
        if (!expense) {
            throw new common_1.NotFoundException(`Expense with ID ${dto.expenseId} not found`);
        }
        const paymentAccount = await this.chartOfAccountRepository.findOne({ where: { id: dto.paymentAccountId } });
        if (!paymentAccount) {
            throw new common_1.NotFoundException(`Payment account with ID ${dto.paymentAccountId} not found`);
        }
        const existingPayments = await this.expensePaymentRepository.find({ where: { expenseId: dto.expenseId } });
        const alreadyPaid = existingPayments.reduce((sum, p) => sum + Number(p.amount), 0);
        if (alreadyPaid + dto.amount > Number(expense.amount) + 0.004) {
            throw new common_1.BadRequestException(`Payment of ${dto.amount} exceeds the remaining balance of ${(Number(expense.amount) - alreadyPaid).toFixed(2)}`);
        }
        return this.dataSource.transaction(async (manager) => {
            const payment = manager.create(expense_payment_entity_1.ExpensePayment, {
                expenseId: dto.expenseId,
                paymentAccountId: dto.paymentAccountId,
                amount: dto.amount,
                paymentDate: dto.paymentDate,
                notes: dto.notes ?? null,
                createdBy,
            });
            const savedPayment = await manager.save(expense_payment_entity_1.ExpensePayment, payment);
            const payableAccount = await manager.findOne(chart_of_account_entity_1.ChartOfAccount, { where: { accountName: ACCOUNTS_PAYABLE_NAME } });
            if (!payableAccount) {
                throw new common_1.NotFoundException(`Chart of accounts is missing "${ACCOUNTS_PAYABLE_NAME}"`);
            }
            const journalEntry = manager.create(journal_entry_entity_1.JournalEntry, {
                entryNumber: `JE-EXPPAY-${savedPayment.id}`,
                entryDate: dto.paymentDate,
                reference: `EXP-${dto.expenseId}`,
                description: `Payment for expense EXP-${dto.expenseId}`,
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
                    description: `Settle payable - EXP-${dto.expenseId}`,
                }),
                manager.create(journal_entry_line_entity_1.JournalEntryLine, {
                    journalEntryId: savedJournalEntry.id,
                    accountId: paymentAccount.id,
                    debitAmount: 0,
                    creditAmount: dto.amount,
                    description: `Payment made - EXP-${dto.expenseId}`,
                }),
            ]);
            return manager.findOne(expense_payment_entity_1.ExpensePayment, { where: { id: savedPayment.id }, relations: RELATIONS });
        });
    }
    async remove(id) {
        const payment = await this.expensePaymentRepository.findOne({ where: { id } });
        if (!payment) {
            throw new common_1.NotFoundException(`Expense payment with ID ${id} not found`);
        }
        await this.expensePaymentRepository.remove(payment);
    }
};
exports.ExpensePaymentsService = ExpensePaymentsService;
exports.ExpensePaymentsService = ExpensePaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(expense_payment_entity_1.ExpensePayment)),
    __param(1, (0, typeorm_1.InjectRepository)(expense_entity_1.Expense)),
    __param(2, (0, typeorm_1.InjectRepository)(chart_of_account_entity_1.ChartOfAccount)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], ExpensePaymentsService);
//# sourceMappingURL=expense-payments.service.js.map