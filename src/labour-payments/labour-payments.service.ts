import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { LabourPayment } from '../entities/labour-payment.entity';
import { WorkOrderLog } from '../entities/work-order-log.entity';
import { StaffMember } from '../entities/staff-member.entity';
import { ChartOfAccount } from '../entities/chart-of-account.entity';
import { JournalEntry } from '../entities/journal-entry.entity';
import { JournalEntryLine } from '../entities/journal-entry-line.entity';
import { CreateLabourPaymentDto } from './dto/create-labour-payment.dto';

const RELATIONS = ['staff', 'paymentAccount'];

// The direct-labour expense account a labour payment always debits — the credit
// side is whichever payment method (bank/cash account) the payer chooses.
const LABOUR_EXPENSE_ACCOUNT_NAME = 'Direct labour - COS';

@Injectable()
export class LabourPaymentsService {
  constructor(
    @InjectRepository(LabourPayment)
    private labourPaymentRepository: Repository<LabourPayment>,
    private dataSource: DataSource,
  ) {}

  async findAll(): Promise<LabourPayment[]> {
    return this.labourPaymentRepository.find({
      relations: RELATIONS,
      order: { paymentDate: 'DESC' },
    });
  }

  async create(dto: CreateLabourPaymentDto, createdBy: number): Promise<LabourPayment> {
    const savedPaymentId = await this.dataSource.transaction(async manager => {
      const log = await manager.findOne(WorkOrderLog, { where: { id: dto.workOrderLogId } });
      if (!log) {
        throw new NotFoundException(`Work order log with ID ${dto.workOrderLogId} not found`);
      }
      const staff = await manager.findOne(StaffMember, { where: { id: dto.staffId } });
      if (!staff) {
        throw new NotFoundException(`Staff member with ID ${dto.staffId} not found`);
      }
      const paymentAccount = await manager.findOne(ChartOfAccount, { where: { id: dto.paymentAccountId } });
      if (!paymentAccount) {
        throw new NotFoundException(`Payment account with ID ${dto.paymentAccountId} not found`);
      }
      const labourExpenseAccount = await manager.findOne(ChartOfAccount, {
        where: { accountName: LABOUR_EXPENSE_ACCOUNT_NAME },
      });
      if (!labourExpenseAccount) {
        throw new NotFoundException(`Chart of accounts is missing "${LABOUR_EXPENSE_ACCOUNT_NAME}"`);
      }

      const payment = manager.create(LabourPayment, {
        workOrderLogId: dto.workOrderLogId,
        staffId: dto.staffId,
        paymentAccountId: dto.paymentAccountId,
        amount: dto.amount,
        paymentDate: dto.paymentDate,
        notes: dto.notes ?? null,
      });
      const savedPayment = await manager.save(LabourPayment, payment);

      const amount = Number(dto.amount);
      const journalEntry = manager.create(JournalEntry, {
        entryNumber: `JE-LP-${savedPayment.id}`,
        entryDate: dto.paymentDate,
        reference: `LP-${savedPayment.id}`,
        description: `Labour payment to ${staff.name}`,
        totalDebit: amount,
        totalCredit: amount,
        status: 'posted',
        createdBy,
      });
      const savedJournalEntry = await manager.save(JournalEntry, journalEntry);

      await manager.save(JournalEntryLine, [
        manager.create(JournalEntryLine, {
          journalEntryId: savedJournalEntry.id,
          accountId: labourExpenseAccount.id,
          debitAmount: amount,
          creditAmount: 0,
          description: `Direct labour - ${staff.name} - LP-${savedPayment.id}`,
        }),
        manager.create(JournalEntryLine, {
          journalEntryId: savedJournalEntry.id,
          accountId: paymentAccount.id,
          debitAmount: 0,
          creditAmount: amount,
          description: `Payment to ${staff.name} - LP-${savedPayment.id}`,
        }),
      ]);

      return savedPayment.id;
    });

    return this.labourPaymentRepository.findOne({ where: { id: savedPaymentId }, relations: RELATIONS }) as Promise<LabourPayment>;
  }

  async remove(id: number): Promise<void> {
    const payment = await this.labourPaymentRepository.findOne({ where: { id } });
    if (!payment) {
      throw new NotFoundException(`Labour payment with ID ${id} not found`);
    }
    await this.labourPaymentRepository.remove(payment);
  }
}
