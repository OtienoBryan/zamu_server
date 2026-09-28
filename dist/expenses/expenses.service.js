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
exports.ExpensesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const expense_entity_1 = require("../entities/expense.entity");
const chart_of_account_entity_1 = require("../entities/chart-of-account.entity");
const journal_entry_entity_1 = require("../entities/journal-entry.entity");
const journal_entry_line_entity_1 = require("../entities/journal-entry-line.entity");
const RELATIONS = ['expenseAccount'];
const EXPENSE_ACCOUNT_TYPE = 16;
const ACCOUNTS_PAYABLE_NAME = 'Accounts Payables';
let ExpensesService = class ExpensesService {
    expenseRepository;
    chartOfAccountRepository;
    dataSource;
    constructor(expenseRepository, chartOfAccountRepository, dataSource) {
        this.expenseRepository = expenseRepository;
        this.chartOfAccountRepository = chartOfAccountRepository;
        this.dataSource = dataSource;
    }
    async findAll() {
        return this.expenseRepository.find({
            relations: RELATIONS,
            order: { date: 'DESC', id: 'DESC' },
        });
    }
    async create(dto, createdBy) {
        const expenseAccount = await this.chartOfAccountRepository.findOne({ where: { id: dto.expenseAccountId } });
        if (!expenseAccount) {
            throw new common_1.NotFoundException(`Chart of account with ID ${dto.expenseAccountId} not found`);
        }
        if (expenseAccount.accountType !== EXPENSE_ACCOUNT_TYPE) {
            throw new common_1.BadRequestException(`Account "${expenseAccount.accountName}" is not an expense account`);
        }
        return this.dataSource.transaction(async (manager) => {
            const expense = manager.create(expense_entity_1.Expense, {
                expenseAccountId: dto.expenseAccountId,
                date: dto.date,
                amount: dto.amount,
                description: dto.description,
                createdBy,
            });
            const savedExpense = await manager.save(expense_entity_1.Expense, expense);
            const payableAccount = await manager.findOne(chart_of_account_entity_1.ChartOfAccount, { where: { accountName: ACCOUNTS_PAYABLE_NAME } });
            if (!payableAccount) {
                throw new common_1.NotFoundException(`Chart of accounts is missing "${ACCOUNTS_PAYABLE_NAME}"`);
            }
            const journalEntry = manager.create(journal_entry_entity_1.JournalEntry, {
                entryNumber: `JE-EXP-${savedExpense.id}`,
                entryDate: dto.date,
                reference: `EXP-${savedExpense.id}`,
                description: `Expense: ${dto.description} (${expenseAccount.accountName})`,
                totalDebit: dto.amount,
                totalCredit: dto.amount,
                status: 'posted',
                createdBy,
            });
            const savedJournalEntry = await manager.save(journal_entry_entity_1.JournalEntry, journalEntry);
            await manager.save(journal_entry_line_entity_1.JournalEntryLine, [
                manager.create(journal_entry_line_entity_1.JournalEntryLine, {
                    journalEntryId: savedJournalEntry.id,
                    accountId: expenseAccount.id,
                    debitAmount: dto.amount,
                    creditAmount: 0,
                    description: `${dto.description} - EXP-${savedExpense.id}`,
                }),
                manager.create(journal_entry_line_entity_1.JournalEntryLine, {
                    journalEntryId: savedJournalEntry.id,
                    accountId: payableAccount.id,
                    debitAmount: 0,
                    creditAmount: dto.amount,
                    description: `Amount payable - EXP-${savedExpense.id}`,
                }),
            ]);
            return manager.findOne(expense_entity_1.Expense, { where: { id: savedExpense.id }, relations: RELATIONS });
        });
    }
};
exports.ExpensesService = ExpensesService;
exports.ExpensesService = ExpensesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(expense_entity_1.Expense)),
    __param(1, (0, typeorm_1.InjectRepository)(chart_of_account_entity_1.ChartOfAccount)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], ExpensesService);
//# sourceMappingURL=expenses.service.js.map