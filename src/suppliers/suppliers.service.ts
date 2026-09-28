import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository, DataSource } from 'typeorm';
import { Supplier } from '../entities/supplier.entity';
import { SupplierLedger } from '../entities/supplier-ledger.entity';
import { ChartOfAccount } from '../entities/chart-of-account.entity';
import { JournalEntry } from '../entities/journal-entry.entity';
import { JournalEntryLine } from '../entities/journal-entry-line.entity';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { CreateSupplierPaymentDto } from './dto/create-supplier-payment.dto';

// The other leg of every purchase receipt (see purchase-orders.service.ts
// `receive()`, which credits this same account) — settling a supplier balance
// debits it back down and credits whichever bank/cash account paid out.
const ACCOUNTS_PAYABLE_NAME = 'Accounts Payables';

export interface SupplierAgingRow {
  supplierId: number;
  supplierName: string;
  current: number;
  days31to60: number;
  days61to90: number;
  over90: number;
  totalOutstanding: number;
}

// A supplier's outstanding balance isn't tagged to individual invoices, so age is
// derived by replaying its ledger chronologically: a balance-increasing entry opens
// a new "lot" dated at that entry, and a balance-decreasing entry (a future payment,
// or a downward adjustment) consumes the oldest open lots first (FIFO) — the standard
// assumption for aging when payments aren't allocated to specific invoices.
interface OpenLot {
  date: Date;
  amount: number;
}

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
    @InjectRepository(SupplierLedger)
    private supplierLedgerRepository: Repository<SupplierLedger>,
    private dataSource: DataSource,
  ) {}

  async findAll(): Promise<Supplier[]> {
    return this.supplierRepository.find({ order: { name: 'ASC' } });
  }

  async findOne(id: number): Promise<Supplier> {
    const supplier = await this.supplierRepository.findOne({ where: { id } });
    if (!supplier) {
      throw new NotFoundException(`Supplier with ID ${id} not found`);
    }
    return supplier;
  }

  async create(dto: CreateSupplierDto): Promise<Supplier> {
    const supplier = this.supplierRepository.create({
      name: dto.name,
      mobileNumber: dto.mobileNumber ?? null,
      email: dto.email ?? null,
      location: dto.location ?? null,
      paymentTermsDays: dto.paymentTermsDays ?? 30,
      creditLimit: dto.creditLimit ?? 0,
      taxPin: dto.taxPin ?? null,
    });
    return this.supplierRepository.save(supplier);
  }

  async update(id: number, dto: UpdateSupplierDto): Promise<Supplier> {
    const supplier = await this.findOne(id);
    Object.assign(supplier, dto);
    return this.supplierRepository.save(supplier);
  }

  async remove(id: number): Promise<void> {
    const supplier = await this.findOne(id);
    await this.supplierRepository.remove(supplier);
  }

  async findLedger(id: number): Promise<SupplierLedger[]> {
    await this.findOne(id);
    return this.supplierLedgerRepository.find({
      where: { supplierId: id },
      relations: ['purchaseOrder'],
      order: { createdAt: 'DESC' },
    });
  }

  async getAgingReport(): Promise<SupplierAgingRow[]> {
    const suppliers = await this.supplierRepository.find({
      where: { balance: MoreThan(0) },
      order: { name: 'ASC' },
    });

    const now = Date.now();
    const rows: SupplierAgingRow[] = [];

    for (const supplier of suppliers) {
      const entries = await this.supplierLedgerRepository.find({
        where: { supplierId: supplier.id },
        order: { createdAt: 'ASC' },
      });

      const openLots: OpenLot[] = [];
      for (const entry of entries) {
        const previous = Number(entry.previousBalance);
        const next = Number(entry.newBalance);
        const delta = Math.abs(next - previous);
        if (delta === 0) continue;

        if (next > previous) {
          openLots.push({ date: entry.createdAt, amount: delta });
        } else {
          let remaining = delta;
          while (remaining > 0.005 && openLots.length > 0) {
            const lot = openLots[0];
            if (lot.amount <= remaining) {
              remaining -= lot.amount;
              openLots.shift();
            } else {
              lot.amount -= remaining;
              remaining = 0;
            }
          }
        }
      }

      let current = 0;
      let days31to60 = 0;
      let days61to90 = 0;
      let over90 = 0;
      for (const lot of openLots) {
        const ageDays = Math.floor((now - lot.date.getTime()) / (1000 * 60 * 60 * 24));
        if (ageDays <= 30) current += lot.amount;
        else if (ageDays <= 60) days31to60 += lot.amount;
        else if (ageDays <= 90) days61to90 += lot.amount;
        else over90 += lot.amount;
      }

      rows.push({
        supplierId: supplier.id,
        supplierName: supplier.name,
        current,
        days31to60,
        days61to90,
        over90,
        totalOutstanding: current + days31to60 + days61to90 + over90,
      });
    }

    return rows;
  }

  // Pays down the supplier's running balance (not a specific purchase order —
  // this ledger tracks one account balance, FIFO-aged on read, same as a real
  // AP account). Mirrors purchase-orders.service.ts `receive()`: lock the
  // balance row, write the ledger entry, then post the offsetting journal.
  async createPayment(supplierId: number, dto: CreateSupplierPaymentDto, createdBy: number): Promise<SupplierLedger> {
    const supplier = await this.findOne(supplierId);
    const previousBalance = Number(supplier.balance);
    if (dto.amount > previousBalance + 0.004) {
      throw new BadRequestException(
        `Payment of ${dto.amount} exceeds the outstanding balance of ${previousBalance.toFixed(2)}`,
      );
    }

    const ledgerId = await this.dataSource.transaction(async (manager) => {
      const lockedSupplier = await manager
        .createQueryBuilder(Supplier, 'supplier')
        .setLock('pessimistic_write')
        .where('supplier.id = :id', { id: supplierId })
        .getOne();
      if (!lockedSupplier) {
        throw new NotFoundException(`Supplier with ID ${supplierId} not found`);
      }

      const paymentAccount = await manager.findOne(ChartOfAccount, { where: { id: dto.paymentAccountId } });
      if (!paymentAccount) {
        throw new NotFoundException(`Payment account with ID ${dto.paymentAccountId} not found`);
      }
      const payableAccount = await manager.findOne(ChartOfAccount, { where: { accountName: ACCOUNTS_PAYABLE_NAME } });
      if (!payableAccount) {
        throw new NotFoundException(`Chart of accounts is missing "${ACCOUNTS_PAYABLE_NAME}"`);
      }

      const lockedPreviousBalance = Number(lockedSupplier.balance);
      const newBalance = lockedPreviousBalance - dto.amount;
      if (newBalance < -0.004) {
        throw new BadRequestException(
          `Payment of ${dto.amount} exceeds the outstanding balance of ${lockedPreviousBalance.toFixed(2)}`,
        );
      }
      await manager.update(Supplier, supplierId, { balance: newBalance });

      const ledgerEntry = manager.create(SupplierLedger, {
        supplierId,
        purchaseOrderId: dto.purchaseOrderId ?? null,
        transactionType: 'payment',
        amount: dto.amount,
        previousBalance: lockedPreviousBalance,
        newBalance,
        notes: dto.notes ?? null,
        paymentAccountId: dto.paymentAccountId,
        createdBy,
      });
      const savedLedgerEntry = await manager.save(SupplierLedger, ledgerEntry);

      const poSuffix = dto.purchaseOrderId ? ` - PO-${dto.purchaseOrderId}` : '';
      const journalEntry = manager.create(JournalEntry, {
        entryNumber: `JE-SUPPAY-${savedLedgerEntry.id}`,
        entryDate: dto.paymentDate,
        reference: dto.purchaseOrderId ? `PO-${dto.purchaseOrderId}` : `SUP-${supplierId}`,
        description: `Payment to ${supplier.name}${poSuffix}`,
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
          description: `Settle payable - ${supplier.name}${poSuffix}`,
        }),
        manager.create(JournalEntryLine, {
          journalEntryId: savedJournalEntry.id,
          accountId: paymentAccount.id,
          debitAmount: 0,
          creditAmount: dto.amount,
          description: `Payment to ${supplier.name}${poSuffix}`,
        }),
      ]);

      return savedLedgerEntry.id;
    });

    return this.supplierLedgerRepository.findOne({
      where: { id: ledgerId },
      relations: ['purchaseOrder', 'paymentAccount'],
    }) as Promise<SupplierLedger>;
  }
}
