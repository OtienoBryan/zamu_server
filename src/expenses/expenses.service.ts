import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Expense } from '../entities/expense.entity';
import { ChartOfAccount } from '../entities/chart-of-account.entity';
import { JournalEntry } from '../entities/journal-entry.entity';
import { JournalEntryLine } from '../entities/journal-entry-line.entity';
import { CreateExpenseDto } from './dto/create-expense.dto';

const RELATIONS = ['expenseAccount'];

// Expense accounts are the operating-expense sub-type (account_type = 16).
// A newly posted expense is unpaid, so it credits Accounts Payables rather
// than a cash/bank account — settling it later is a separate action.
const EXPENSE_ACCOUNT_TYPE = 16;
const ACCOUNTS_PAYABLE_NAME = 'Accounts Payables';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense)
    private expenseRepository: Repository<Expense>,
    @InjectRepository(ChartOfAccount)
    private chartOfAccountRepository: Repository<ChartOfAccount>,
    private dataSource: DataSource,
  ) {}

  async findAll(): Promise<Expense[]> {
    return this.expenseRepository.find({
      relations: RELATIONS,
      order: { date: 'DESC', id: 'DESC' },
    });
  }

  async create(dto: CreateExpenseDto, createdBy: number): Promise<Expense> {
    const expenseAccount = await this.chartOfAccountRepository.findOne({ where: { id: dto.expenseAccountId } });
    if (!expenseAccount) {
      throw new NotFoundException(`Chart of account with ID ${dto.expenseAccountId} not found`);
    }
    if (expenseAccount.accountType !== EXPENSE_ACCOUNT_TYPE) {
      throw new BadRequestException(`Account "${expenseAccount.accountName}" is not an expense account`);
    }

    return this.dataSource.transaction(async (manager) => {
      const expense = manager.create(Expense, {
        expenseAccountId: dto.expenseAccountId,
        date: dto.date,
        amount: dto.amount,
        description: dto.description,
        createdBy,
      });
      const savedExpense = await manager.save(Expense, expense);

      const payableAccount = await manager.findOne(ChartOfAccount, { where: { accountName: ACCOUNTS_PAYABLE_NAME } });
      if (!payableAccount) {
        throw new NotFoundException(`Chart of accounts is missing "${ACCOUNTS_PAYABLE_NAME}"`);
      }

      const journalEntry = manager.create(JournalEntry, {
        entryNumber: `JE-EXP-${savedExpense.id}`,
        entryDate: dto.date,
        reference: `EXP-${savedExpense.id}`,
        description: `Expense: ${dto.description} (${expenseAccount.accountName})`,
        totalDebit: dto.amount,
        totalCredit: dto.amount,
        status: 'posted',
        createdBy,
      });
      const savedJournalEntry = await manager.save(JournalEntry, journalEntry);

      await manager.save(JournalEntryLine, [
        manager.create(JournalEntryLine, {
          journalEntryId: savedJournalEntry.id,
          accountId: expenseAccount.id,
          debitAmount: dto.amount,
          creditAmount: 0,
          description: `${dto.description} - EXP-${savedExpense.id}`,
        }),
        manager.create(JournalEntryLine, {
          journalEntryId: savedJournalEntry.id,
          accountId: payableAccount.id,
          debitAmount: 0,
          creditAmount: dto.amount,
          description: `Amount payable - EXP-${savedExpense.id}`,
        }),
      ]);

      return manager.findOne(Expense, { where: { id: savedExpense.id }, relations: RELATIONS }) as Promise<Expense>;
    });
  }
}
