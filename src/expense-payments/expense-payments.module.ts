import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpensePaymentsService } from './expense-payments.service';
import { ExpensePaymentsController } from './expense-payments.controller';
import { ExpensePayment } from '../entities/expense-payment.entity';
import { Expense } from '../entities/expense.entity';
import { ChartOfAccount } from '../entities/chart-of-account.entity';
import { JournalEntry } from '../entities/journal-entry.entity';
import { JournalEntryLine } from '../entities/journal-entry-line.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExpensePayment, Expense, ChartOfAccount, JournalEntry, JournalEntryLine]),
  ],
  controllers: [ExpensePaymentsController],
  providers: [ExpensePaymentsService],
  exports: [ExpensePaymentsService],
})
export class ExpensePaymentsModule {}
