import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, In } from 'typeorm';
import { PosSale } from '../entities/pos-sale.entity';
import { PosSaleItem } from '../entities/pos-sale-item.entity';
import { FinishedProduct } from '../entities/finished-product.entity';
import { ClientRecord } from '../entities/client-record.entity';
import { RawMaterialStore } from '../entities/raw-material-store.entity';
import { FinishedProductStoreInventory } from '../entities/finished-product-store-inventory.entity';
import { FinishedProductInventoryLedger } from '../entities/finished-product-inventory-ledger.entity';
import { ChartOfAccount } from '../entities/chart-of-account.entity';
import { JournalEntry } from '../entities/journal-entry.entity';
import { JournalEntryLine } from '../entities/journal-entry-line.entity';
import { CreatePosSaleDto } from './dto/create-pos-sale.dto';

const RELATIONS = ['items', 'items.product', 'client', 'store', 'postedByStaff'];

// The chart-of-accounts entries a POS sale always posts to. Looked up by name
// each time rather than hardcoding IDs, since chart_of_accounts is managed
// outside this module. A sale is unpaid at posting time, so the customer side
// hits Accounts Receivable rather than a cash/bank account.
const RECEIVABLE_ACCOUNT_NAME = 'Debtors Control Account (POS)';
const REVENUE_ACCOUNT_NAME = 'Sales Revenue';
const OUTPUT_TAX_ACCOUNT_NAME = 'Output Tax Account';
const COGS_ACCOUNT_NAME = 'Cost of Goods Sold - Finished Products';
const STOCK_ACCOUNT_NAME = 'Stock';

@Injectable()
export class PosSalesService {
  constructor(
    @InjectRepository(PosSale)
    private posSaleRepository: Repository<PosSale>,
    @InjectRepository(FinishedProduct)
    private productRepository: Repository<FinishedProduct>,
    @InjectRepository(ClientRecord)
    private clientRepository: Repository<ClientRecord>,
    @InjectRepository(RawMaterialStore)
    private storeRepository: Repository<RawMaterialStore>,
    private dataSource: DataSource,
  ) {}

  // The postedByStaff relation pulls from the `staff` login table, which also
  // carries a password hash — redact it down to id/name before it ever leaves
  // this service.
  private redactStaff(sale: PosSale): PosSale {
    if (sale.postedByStaff) {
      sale.postedByStaff = { id: sale.postedByStaff.id, name: sale.postedByStaff.name } as PosSale['postedByStaff'];
    }
    return sale;
  }

  async findAll(): Promise<PosSale[]> {
    const sales = await this.posSaleRepository.find({
      relations: RELATIONS,
      order: { createdAt: 'DESC' },
    });
    return sales.map((s) => this.redactStaff(s));
  }

  async findOne(id: number): Promise<PosSale> {
    const sale = await this.posSaleRepository.findOne({ where: { id }, relations: RELATIONS });
    if (!sale) {
      throw new NotFoundException(`POS sale with ID ${id} not found`);
    }
    return this.redactStaff(sale);
  }

  async create(dto: CreatePosSaleDto, createdBy: number): Promise<PosSale> {
    const productIds = dto.items.map((i) => i.productId);
    // These three reads don't depend on each other — running them concurrently
    // (each gets its own pooled connection, unlike the queries inside the
    // transaction below) cuts real wall-clock time on a remote DB.
    const [products, client, store] = await Promise.all([
      this.productRepository.find({ where: { id: In(productIds) } }),
      dto.clientId != null ? this.clientRepository.findOne({ where: { id: dto.clientId } }) : Promise.resolve(null),
      dto.storeId != null ? this.storeRepository.findOne({ where: { id: dto.storeId } }) : Promise.resolve(null),
    ]);
    const productMap = new Map(products.map((p) => [p.id, p]));
    for (const item of dto.items) {
      if (!productMap.has(item.productId)) {
        throw new NotFoundException(`Finished product with ID ${item.productId} not found`);
      }
    }
    if (dto.clientId != null && !client) {
      throw new NotFoundException(`Client with ID ${dto.clientId} not found`);
    }
    if (dto.storeId != null && !store) {
      throw new NotFoundException(`Store with ID ${dto.storeId} not found`);
    }

    return this.dataSource.transaction(async (manager) => {
      const subtotal = dto.items.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0);
      const taxRate = dto.taxRate ?? 16;
      const taxAmount = subtotal * (taxRate / 100);
      const totalAmount = subtotal + taxAmount;
      const totalCost = dto.items.reduce(
        (sum, i) => sum + i.quantity * Number(productMap.get(i.productId)!.productionCost),
        0,
      );

      const sale = manager.create(PosSale, {
        clientId: dto.clientId ?? null,
        storeId: dto.storeId ?? null,
        subtotal,
        taxRate,
        taxAmount,
        totalAmount,
        createdBy,
      });
      const savedSale = await manager.save(PosSale, sale);

      const items = dto.items.map((i) =>
        manager.create(PosSaleItem, {
          posSaleId: savedSale.id,
          productId: i.productId,
          quantity: i.quantity,
          unitPrice: i.unitPrice,
          totalPrice: i.quantity * i.unitPrice,
        }),
      );
      await manager.save(PosSaleItem, items);

      // Deduct sold quantities from the chosen store's finished-goods inventory
      // and log each as a sale_issue — mirrors the manual adjustment/transfer
      // flows on the Finished Product Inventory page, so all three write to the
      // same ledger. Batched into one read + one multi-row insert instead of a
      // findOne/save/save round trip per cart line — the transaction holds a
      // single DB connection, so per-item round trips serialize and dominate
      // posting time on a remote DB.
      if (store) {
        const existingInventory = await manager.find(FinishedProductStoreInventory, {
          where: { storeId: store.id, productId: In(productIds) },
        });
        const inventoryByProduct = new Map(existingInventory.map((row) => [row.productId, row]));
        const ledgerEntries: FinishedProductInventoryLedger[] = [];

        for (const item of dto.items) {
          const inventory = inventoryByProduct.get(item.productId);
          const previousQuantity = inventory ? Number(inventory.quantity) : 0;
          if (previousQuantity < item.quantity) {
            const productName = productMap.get(item.productId)!.name;
            throw new BadRequestException(
              `Not enough "${productName}" in stock at ${store.name} — only ${previousQuantity} available, ${item.quantity} requested`,
            );
          }
          const newQuantity = previousQuantity - item.quantity;

          if (!inventory) {
            const created = manager.create(FinishedProductStoreInventory, {
              storeId: store.id,
              productId: item.productId,
              quantity: newQuantity,
            });
            inventoryByProduct.set(item.productId, created);
          } else {
            inventory.quantity = newQuantity;
          }

          ledgerEntries.push(manager.create(FinishedProductInventoryLedger, {
            storeId: store.id,
            productId: item.productId,
            transactionType: 'sale_issue',
            quantity: item.quantity,
            previousQuantity,
            newQuantity,
            notes: `POS-${savedSale.id}`,
            createdBy,
          }));
        }

        await manager.save(FinishedProductStoreInventory, Array.from(inventoryByProduct.values()));
        await manager.save(FinishedProductInventoryLedger, ledgerEntries);
      }

      // Post the double-entry journal for the sale: Revenue and Output Tax are
      // credited (income/liability increase), Accounts Receivable is debited
      // (the sale is unpaid at posting time). If the items' production cost is
      // known, a matching COGS/Stock entry is posted too. Looked up in one
      // query instead of five to cut round trips on the shared transaction
      // connection.
      const accountNames = [RECEIVABLE_ACCOUNT_NAME, REVENUE_ACCOUNT_NAME, OUTPUT_TAX_ACCOUNT_NAME, COGS_ACCOUNT_NAME, STOCK_ACCOUNT_NAME];
      const accounts = await manager.find(ChartOfAccount, { where: { accountName: In(accountNames) } });
      const accountByName = new Map(accounts.map((a) => [a.accountName, a]));
      const receivableAccount = accountByName.get(RECEIVABLE_ACCOUNT_NAME);
      const revenueAccount = accountByName.get(REVENUE_ACCOUNT_NAME);
      const taxAccount = accountByName.get(OUTPUT_TAX_ACCOUNT_NAME);
      const cogsAccount = accountByName.get(COGS_ACCOUNT_NAME);
      const stockAccount = accountByName.get(STOCK_ACCOUNT_NAME);
      if (!receivableAccount) {
        throw new NotFoundException(`Chart of accounts is missing "${RECEIVABLE_ACCOUNT_NAME}"`);
      }
      if (!revenueAccount) {
        throw new NotFoundException(`Chart of accounts is missing "${REVENUE_ACCOUNT_NAME}"`);
      }
      if (taxAmount > 0 && !taxAccount) {
        throw new NotFoundException(`Chart of accounts is missing "${OUTPUT_TAX_ACCOUNT_NAME}"`);
      }
      if (totalCost > 0 && !cogsAccount) {
        throw new NotFoundException(`Chart of accounts is missing "${COGS_ACCOUNT_NAME}"`);
      }
      if (totalCost > 0 && !stockAccount) {
        throw new NotFoundException(`Chart of accounts is missing "${STOCK_ACCOUNT_NAME}"`);
      }

      // `client` was already fetched (and validated) before the transaction
      // started — reuse it instead of re-querying it here.
      const clientName = client?.name ?? (dto.clientId != null ? `Client #${dto.clientId}` : 'Walk-in customer');

      const journalEntry = manager.create(JournalEntry, {
        entryNumber: `JE-POS-${savedSale.id}`,
        entryDate: new Date().toISOString().slice(0, 10),
        reference: `POS-${savedSale.id}`,
        description: `POS sale to ${clientName}`,
        totalDebit: totalAmount + totalCost,
        totalCredit: totalAmount + totalCost,
        status: 'posted',
        createdBy,
      });
      const savedJournalEntry = await manager.save(JournalEntry, journalEntry);

      const journalLines = [
        manager.create(JournalEntryLine, {
          journalEntryId: savedJournalEntry.id,
          accountId: receivableAccount.id,
          debitAmount: totalAmount,
          creditAmount: 0,
          description: `Amount receivable from ${clientName} - POS-${savedSale.id}`,
        }),
        manager.create(JournalEntryLine, {
          journalEntryId: savedJournalEntry.id,
          accountId: revenueAccount.id,
          debitAmount: 0,
          creditAmount: subtotal,
          description: `Sales revenue - POS-${savedSale.id}`,
        }),
        ...(taxAmount > 0
          ? [
              manager.create(JournalEntryLine, {
                journalEntryId: savedJournalEntry.id,
                accountId: taxAccount!.id,
                debitAmount: 0,
                creditAmount: taxAmount,
                description: `Output tax - POS-${savedSale.id}`,
              }),
            ]
          : []),
        ...(totalCost > 0
          ? [
              manager.create(JournalEntryLine, {
                journalEntryId: savedJournalEntry.id,
                accountId: cogsAccount!.id,
                debitAmount: totalCost,
                creditAmount: 0,
                description: `Cost of goods sold - POS-${savedSale.id}`,
              }),
              manager.create(JournalEntryLine, {
                journalEntryId: savedJournalEntry.id,
                accountId: stockAccount!.id,
                debitAmount: 0,
                creditAmount: totalCost,
                description: `Finished goods issued - POS-${savedSale.id}`,
              }),
            ]
          : []),
      ];
      await manager.save(JournalEntryLine, journalLines);

      // Skip re-fetching the sale with its full relation graph (items.product,
      // client, store, postedByStaff) — that's a multi-join round trip the
      // caller (the POS screen) doesn't need; it only reads `id`/`totalAmount`
      // off the response. Everything else refreshes from findAll/findOne.
      savedSale.items = items;
      return savedSale;
    });
  }
}
