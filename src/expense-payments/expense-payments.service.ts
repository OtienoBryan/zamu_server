import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { ExpensePayment } from '../entities/expense-payment.entity';
import { Expense } from '../entities/expense.entity';
import { ChartOfAccount } from '../entities/chart-of-account.entity';
import { JournalEntry } from '../entities/journal-entry.entity';
import { JournalEntryLine } from '../entities/journal-entry-line.entity';
import { CreateExpensePaymentDto } from './dto/create-expense-payment.dto';

const RELATIONS = ['paymentAccount'];
const ACCOUNTS_PAYABLE_NAME = 'Accounts Payables';

@Injectable()
export class ExpensePaymentsService {
  constructor(
    @InjectRepository(ExpensePayment)
    private expensePaymentRepository: Repository<ExpensePayment>,
    @InjectRepository(Expense)
    private expenseRepository: Repository<Expense>,
    @InjectRepository(ChartOfAccount)
    private chartOfAccountRepository: Repository<ChartOfAccount>,
    private dataSource: DataSource,
  ) {}

  async findAll(): Promise<ExpensePayment[]> {
    return this.expensePaymentRepository.find({
      relations: RELATIONS,
      order: { paymentDate: 'DESC' },
    });
  }

  async findForExpense(expenseId: number): Promise<ExpensePayment[]> {
    return this.expensePaymentRepository.find({
      where: { expenseId },
      relations: RELATIONS,
      order: { paymentDate: 'DESC' },
    });
  }

  async create(dto: CreateExpensePaymentDto, createdBy: number): Promise<ExpensePayment> {
    const expense = await this.expenseRepository.findOne({ where: { id: dto.expenseId } });
    if (!expense) {
      throw new NotFoundException(`Expense with ID ${dto.expenseId} not found`);
    }
    const paymentAccount = await this.chartOfAccountRepository.findOne({ where: { id: dto.paymentAccountId } });
    if (!paymentAccount) {
      throw new NotFoundException(`Payment account with ID ${dto.paymentAccountId} not found`);
    }

    const existingPayments = await this.expensePaymentRepository.find({ where: { expenseId: dto.expenseId } });
    const alreadyPaid = existingPayments.reduce((sum, p) => sum + Number(p.amount), 0);
    if (alreadyPaid + dto.amount > Number(expense.amount) + 0.004) {
      throw new BadRequestException(
        `Payment of ${dto.amount} exceeds the remaining balance of ${(Number(expense.amount) - alreadyPaid).toFixed(2)}`,
      );
    }

    return this.dataSource.transaction(async (manager) => {
      const payment = manager.create(ExpensePayment, {
        expenseId: dto.expenseId,
        paymentAccountId: dto.paymentAccountId,
        amount: dto.amount,
        paymentDate: dto.paymentDate,
        notes: dto.notes ?? null,
        createdBy,
      });
      const savedPayment = await manager.save(ExpensePayment, payment);

      const payableAccount = await manager.findOne(ChartOfAccount, { where: { accountName: ACCOUNTS_PAYABLE_NAME } });
      if (!payableAccount) {
        throw new NotFoundException(`Chart of accounts is missing "${ACCOUNTS_PAYABLE_NAME}"`);
      }

      const journalEntry = manager.create(JournalEntry, {
        entryNumber: `JE-EXPPAY-${savedPayment.id}`,
        entryDate: dto.paymentDate,
        reference: `EXP-${dto.expenseId}`,
        description: `Payment for expense EXP-${dto.expenseId}`,
        totalDebit: dto.amount,
        totalCredit: dto.amount,
        status: 'posted',
        createdBy,
      });
      const savedJournalEntry = await manager.save(JournalEntry, journalEntry);

      await manager.save(JournalEntryLine, [
        manager.create(JournalEntryLine, {
          journalEntryId: savedJournalEntry.id,
          accountId: payableAccount.id,
          debitAmount: dto.amount,
          creditAmount: 0,
          description: `Settle payable - EXP-${dto.expenseId}`,
        }),
        manager.create(JournalEntryLine, {
          journalEntryId: savedJournalEntry.id,
          accountId: paymentAccount.id,
          debitAmount: 0,
          creditAmount: dto.amount,
          description: `Payment made - EXP-${dto.expenseId}`,
        }),
      ]);

      return manager.findOne(ExpensePayment, { where: { id: savedPayment.id }, relations: RELATIONS }) as Promise<ExpensePayment>;
    });
  }

  async remove(id: number): Promise<void> {
    const payment = await this.expensePaymentRepository.findOne({ where: { id } });
    if (!payment) {
      throw new NotFoundException(`Expense payment with ID ${id} not found`);
    }
    await this.expensePaymentRepository.remove(payment);
  }
}
