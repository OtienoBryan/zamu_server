import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { PosSalePayment } from '../entities/pos-sale-payment.entity';
import { PosSale } from '../entities/pos-sale.entity';
import { ChartOfAccount } from '../entities/chart-of-account.entity';
import { JournalEntry } from '../entities/journal-entry.entity';
import { JournalEntryLine } from '../entities/journal-entry-line.entity';
import { Receipt } from '../entities/receipt.entity';
import { CreatePosSalePaymentDto } from './dto/create-pos-sale-payment.dto';

const RELATIONS = ['paymentAccount'];

// The customer side of every POS sale posts to this receivable account (see
// pos-sales.service.ts) — settling it later credits the same account and
// debits whichever bank/cash account received the payment.
const RECEIVABLE_ACCOUNT_NAME = 'Debtors Control Account (POS)';

@Injectable()
export class PosSalePaymentsService {
  constructor(
    @InjectRepository(PosSalePayment)
    private paymentRepository: Repository<PosSalePayment>,
    @InjectRepository(PosSale)
    private posSaleRepository: Repository<PosSale>,
    @InjectRepository(ChartOfAccount)
    private chartOfAccountRepository: Repository<ChartOfAccount>,
    private dataSource: DataSource,
  ) {}

  async findAll(): Promise<PosSalePayment[]> {
    return this.paymentRepository.find({
      relations: RELATIONS,
      order: { paymentDate: 'DESC' },
    });
  }

  async findForSale(posSaleId: number): Promise<PosSalePayment[]> {
    return this.paymentRepository.find({
      where: { posSaleId },
      relations: RELATIONS,
      order: { paymentDate: 'DESC' },
    });
  }

  async create(dto: CreatePosSalePaymentDto, createdBy: number): Promise<PosSalePayment> {
    const sale = await this.posSaleRepository.findOne({ where: { id: dto.posSaleId } });
    if (!sale) {
      throw new NotFoundException(`POS sale with ID ${dto.posSaleId} not found`);
    }
    const paymentAccount = await this.chartOfAccountRepository.findOne({ where: { id: dto.paymentAccountId } });
    if (!paymentAccount) {
      throw new NotFoundException(`Payment account with ID ${dto.paymentAccountId} not found`);
    }

    const existingPayments = await this.paymentRepository.find({ where: { posSaleId: dto.posSaleId } });
    const alreadyPaid = existingPayments.reduce((sum, p) => sum + Number(p.amount), 0);
    if (alreadyPaid + dto.amount > Number(sale.totalAmount) + 0.004) {
      throw new BadRequestException(
        `Payment of ${dto.amount} exceeds the remaining balance of ${(Number(sale.totalAmount) - alreadyPaid).toFixed(2)}`,
      );
    }

    return this.dataSource.transaction(async (manager) => {
      const payment = manager.create(PosSalePayment, {
        posSaleId: dto.posSaleId,
        paymentAccountId: dto.paymentAccountId,
        amount: dto.amount,
        paymentDate: dto.paymentDate,
        notes: dto.notes ?? null,
        createdBy,
      });
      const savedPayment = await manager.save(PosSalePayment, payment);

      const receivableAccount = await manager.findOne(ChartOfAccount, { where: { accountName: RECEIVABLE_ACCOUNT_NAME } });
      if (!receivableAccount) {
        throw new NotFoundException(`Chart of accounts is missing "${RECEIVABLE_ACCOUNT_NAME}"`);
      }

      const journalEntry = manager.create(JournalEntry, {
        entryNumber: `JE-POSPAY-${savedPayment.id}`,
        entryDate: dto.paymentDate,
        reference: `POS-${dto.posSaleId}`,
        description: `Payment received for POS-${dto.posSaleId}`,
        totalDebit: dto.amount,
        totalCredit: dto.amount,
        status: 'posted',
        createdBy,
      });
      const savedJournalEntry = await manager.save(JournalEntry, journalEntry);

      await manager.save(JournalEntryLine, [
        manager.create(JournalEntryLine, {
          journalEntryId: savedJournalEntry.id,
          accountId: paymentAccount.id,
          debitAmount: dto.amount,
          creditAmount: 0,
          description: `Payment received - POS-${dto.posSaleId}`,
        }),
        manager.create(JournalEntryLine, {
          journalEntryId: savedJournalEntry.id,
          accountId: receivableAccount.id,
          debitAmount: 0,
          creditAmount: dto.amount,
          description: `Settle receivable - POS-${dto.posSaleId}`,
        }),
      ]);

      // Every posted payment generates its own receipt — numbered off the
      // payment's own ID so it's stable and unique without a separate counter.
      await manager.save(Receipt, manager.create(Receipt, {
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

      return manager.findOne(PosSalePayment, { where: { id: savedPayment.id }, relations: RELATIONS }) as Promise<PosSalePayment>;
    });
  }

  async remove(id: number): Promise<void> {
    const payment = await this.paymentRepository.findOne({ where: { id } });
    if (!payment) {
      throw new NotFoundException(`POS sale payment with ID ${id} not found`);
    }
    // The receipt exists only as a record of this payment — remove it too so
    // it doesn't dangle pointing at a payment that no longer exists.
    await this.dataSource.getRepository(Receipt).delete({ posSalePaymentId: id });
    await this.paymentRepository.remove(payment);
  }
}
