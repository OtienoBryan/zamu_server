import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PosSalePaymentsService } from './pos-sale-payments.service';
import { PosSalePaymentsController } from './pos-sale-payments.controller';
import { PosSalePayment } from '../entities/pos-sale-payment.entity';
import { PosSale } from '../entities/pos-sale.entity';
import { ChartOfAccount } from '../entities/chart-of-account.entity';
import { JournalEntry } from '../entities/journal-entry.entity';
import { JournalEntryLine } from '../entities/journal-entry-line.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PosSalePayment, PosSale, ChartOfAccount, JournalEntry, JournalEntryLine]),
  ],
  controllers: [PosSalePaymentsController],
  providers: [PosSalePaymentsService],
  exports: [PosSalePaymentsService],
})
export class PosSalePaymentsModule {}
