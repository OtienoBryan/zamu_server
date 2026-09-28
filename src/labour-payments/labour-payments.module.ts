import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LabourPaymentsService } from './labour-payments.service';
import { LabourPaymentsController } from './labour-payments.controller';
import { LabourPayment } from '../entities/labour-payment.entity';
import { WorkOrderLog } from '../entities/work-order-log.entity';
import { StaffMember } from '../entities/staff-member.entity';
import { ChartOfAccount } from '../entities/chart-of-account.entity';
import { JournalEntry } from '../entities/journal-entry.entity';
import { JournalEntryLine } from '../entities/journal-entry-line.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LabourPayment,
      WorkOrderLog,
      StaffMember,
      ChartOfAccount,
      JournalEntry,
      JournalEntryLine,
    ]),
  ],
  controllers: [LabourPaymentsController],
  providers: [LabourPaymentsService],
  exports: [LabourPaymentsService],
})
export class LabourPaymentsModule {}
