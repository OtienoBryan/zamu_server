import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, In } from 'typeorm';
import { RawMaterialPurchaseOrder } from '../entities/raw-material-purchase-order.entity';
import { RawMaterialPurchaseOrderItem } from '../entities/raw-material-purchase-order-item.entity';
import { RawMaterialStore } from '../entities/raw-material-store.entity';
import { RawMaterialStoreInventory } from '../entities/raw-material-store-inventory.entity';
import { RawMaterialInventoryLedger } from '../entities/raw-material-inventory-ledger.entity';
import { RawMaterial } from '../entities/raw-material.entity';
import { Supplier } from '../entities/supplier.entity';
import { SupplierLedger } from '../entities/supplier-ledger.entity';
import { ChartOfAccount } from '../entities/chart-of-account.entity';
import { JournalEntry } from '../entities/journal-entry.entity';
import { JournalEntryLine } from '../entities/journal-entry-line.entity';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { ReceivePurchaseOrderDto } from './dto/receive-purchase-order.dto';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

const RELATIONS = ['supplier', 'store', 'items', 'items.rawMaterial'];

// The three chart-of-accounts entries a raw-material purchase receipt always posts to.
// Looked up by name each time rather than hardcoding IDs, since chart_of_accounts is
// managed outside this module.
const STOCK_ACCOUNT_NAME = 'Stock';
const PURCHASE_TAX_ACCOUNT_NAME = 'Purchase Tax Control Account';
const ACCOUNTS_PAYABLE_NAME = 'Accounts Payables';

@Injectable()
export class PurchaseOrdersService {
  constructor(
    @InjectRepository(RawMaterialPurchaseOrder)
    private purchaseOrderRepository: Repository<RawMaterialPurchaseOrder>,
    @InjectRepository(RawMaterialStore)
    private storeRepository: Repository<RawMaterialStore>,
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
    @InjectRepository(RawMaterial)
    private rawMaterialRepository: Repository<RawMaterial>,
    private dataSource: DataSource,
  ) {}

  async findAll(): Promise<RawMaterialPurchaseOrder[]> {
    return this.purchaseOrderRepository.find({
      relations: RELATIONS,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<RawMaterialPurchaseOrder> {
    const po = await this.purchaseOrderRepository.findOne({
      where: { id },
      relations: RELATIONS,
    });
    if (!po) {
      throw new NotFoundException(`Purchase order with ID ${id} not found`);
    }
    return po;
  }

  async create(dto: CreatePurchaseOrderDto): Promise<RawMaterialPurchaseOrder> {
    const supplier = await this.supplierRepository.findOne({ where: { id: dto.supplierId } });
    if (!supplier) {
      throw new NotFoundException(`Supplier with ID ${dto.supplierId} not found`);
    }

    const rawMaterialIds = dto.items.map((i) => i.rawMaterialId);
    const materials = await this.rawMaterialRepository.find({ where: { id: In(rawMaterialIds) } });
    const materialMap = new Map(materials.map((m) => [m.id, m]));
    for (const item of dto.items) {
      if (!materialMap.has(item.rawMaterialId)) {
        throw new NotFoundException(`Raw material with ID ${item.rawMaterialId} not found`);
      }
    }

    return this.dataSource.transaction(async (manager) => {
      const subtotal = dto.items.reduce((sum, i) => sum + i.quantity * i.unitCost, 0);
      const taxRate = dto.taxRate ?? 16;
      const taxAmount = subtotal * (taxRate / 100);
      const totalAmount = subtotal + taxAmount;

      const po = manager.create(RawMaterialPurchaseOrder, {
        supplierId: dto.supplierId,
        status: 'pending',
        subtotal,
        taxRate,
        taxAmount,
        totalAmount,
      });
      const savedPo = await manager.save(RawMaterialPurchaseOrder, po);

      const items = dto.items.map((i) =>
        manager.create(RawMaterialPurchaseOrderItem, {
          purchaseOrderId: savedPo.id,
          rawMaterialId: i.rawMaterialId,
          quantity: i.quantity,
          unitCost: i.unitCost,
          totalCost: i.quantity * i.unitCost,
        }),
      );
      await manager.save(RawMaterialPurchaseOrderItem, items);

      const withRelations = await manager.findOne(RawMaterialPurchaseOrder, {
        where: { id: savedPo.id },
        relations: RELATIONS,
      });
      return withRelations!;
    });
  }

  async receive(id: number, dto: ReceivePurchaseOrderDto, createdBy: number): Promise<RawMaterialPurchaseOrder> {
    const po = await this.findOne(id);
    if (po.status !== 'pending') {
      throw new ConflictException(`Purchase order is already ${po.status} and cannot be received`);
    }

    const store = await this.storeRepository.findOne({ where: { id: dto.storeId } });
    if (!store) {
      throw new NotFoundException(`Store with ID ${dto.storeId} not found`);
    }

    // The received quantities must be confirmed for every ordered line — one
    // dto entry per po.items row, matched by item id.
    const receivedByItemId = new Map(dto.items.map((i) => [i.id, i.quantity]));
    for (const item of po.items) {
      if (!receivedByItemId.has(item.id)) {
        throw new BadRequestException(`Missing received quantity for item ${item.id} (${item.rawMaterial?.name ?? ''})`.trim());
      }
    }

    return this.dataSource.transaction(async (manager) => {
      for (const item of po.items) {
        const receivedQuantity = receivedByItemId.get(item.id)!;

        await manager.update(RawMaterialPurchaseOrderItem, item.id, { receivedQuantity });

        // Skip posting to inventory when nothing was actually received for
        // this line (short-shipped item) — there's nothing to add to stock.
        if (receivedQuantity <= 0) continue;

        let inventory = await manager.findOne(RawMaterialStoreInventory, {
          where: { storeId: dto.storeId, rawMaterialId: item.rawMaterialId },
        });

        const previousQuantity = inventory ? Number(inventory.quantity) : 0;
        const newQuantity = previousQuantity + receivedQuantity;

        if (!inventory) {
          inventory = manager.create(RawMaterialStoreInventory, {
            storeId: dto.storeId,
            rawMaterialId: item.rawMaterialId,
            quantity: newQuantity,
          });
        } else {
          inventory.quantity = newQuantity;
        }
        await manager.save(RawMaterialStoreInventory, inventory);

        const variance = receivedQuantity - Number(item.quantity);
        const notes = variance === 0
          ? `Received from PO-${po.id}`
          : `Received ${receivedQuantity} of ${item.quantity} ordered from PO-${po.id} (${variance > 0 ? '+' : ''}${variance})`;

        const ledgerEntry = manager.create(RawMaterialInventoryLedger, {
          storeId: dto.storeId,
          rawMaterialId: item.rawMaterialId,
          purchaseOrderId: po.id,
          transactionType: 'purchase_receipt',
          quantity: receivedQuantity,
          previousQuantity,
          newQuantity,
          notes,
        });
        await manager.save(RawMaterialInventoryLedger, ledgerEntry);

        // Keep the material's standing cost current with what was actually
        // paid on this receipt, so future POs/valuations default to it.
        await manager.update(RawMaterial, item.rawMaterialId, { cost: item.unitCost });
      }

      // Lock the supplier row for the balance read-modify-write so two concurrent
      // receives against the same supplier can't race and clobber each other's update.
      const supplier = await manager
        .createQueryBuilder(Supplier, 'supplier')
        .setLock('pessimistic_write')
        .where('supplier.id = :id', { id: po.supplierId })
        .getOne();
      if (!supplier) {
        throw new NotFoundException(`Supplier with ID ${po.supplierId} not found`);
      }

      const previousBalance = Number(supplier.balance);
      const newBalance = previousBalance + Number(po.totalAmount);

      await manager.update(Supplier, po.supplierId, { balance: newBalance });

      const supplierLedgerEntry = manager.create(SupplierLedger, {
        supplierId: po.supplierId,
        purchaseOrderId: po.id,
        transactionType: 'purchase',
        amount: po.totalAmount,
        previousBalance,
        newBalance,
        notes: `Goods received for PO-${po.id}`,
      });
      await manager.save(SupplierLedger, supplierLedgerEntry);

      // Post the double-entry journal for the receipt: Stock and the Purchase Tax
      // Control Account are debited (assets/tax recoverable increase), Accounts
      // Payable is credited (liability increase) — debits and credits both equal
      // po.totalAmount, so the entry always balances.
      const [stockAccount, taxAccount, payableAccount] = await Promise.all([
        manager.findOne(ChartOfAccount, { where: { accountName: STOCK_ACCOUNT_NAME } }),
        manager.findOne(ChartOfAccount, { where: { accountName: PURCHASE_TAX_ACCOUNT_NAME } }),
        manager.findOne(ChartOfAccount, { where: { accountName: ACCOUNTS_PAYABLE_NAME } }),
      ]);
      if (!stockAccount) {
        throw new NotFoundException(`Chart of accounts is missing "${STOCK_ACCOUNT_NAME}"`);
      }
      if (!payableAccount) {
        throw new NotFoundException(`Chart of accounts is missing "${ACCOUNTS_PAYABLE_NAME}"`);
      }
      const taxAmount = Number(po.taxAmount);
      if (taxAmount > 0 && !taxAccount) {
        throw new NotFoundException(`Chart of accounts is missing "${PURCHASE_TAX_ACCOUNT_NAME}"`);
      }

      const subtotal = Number(po.subtotal);
      const totalAmount = Number(po.totalAmount);
      const supplierName = po.supplier?.name ?? `Supplier #${po.supplierId}`;

      const journalEntry = manager.create(JournalEntry, {
        entryNumber: `JE-PO-${po.id}`,
        entryDate: new Date().toISOString().slice(0, 10),
        reference: `PO-${po.id}`,
        description: `Goods received for PO-${po.id} from ${supplierName}`,
        totalDebit: totalAmount,
        totalCredit: totalAmount,
        status: 'posted',
        createdBy,
      });
      const savedJournalEntry = await manager.save(JournalEntry, journalEntry);

      const journalLines = [
        manager.create(JournalEntryLine, {
          journalEntryId: savedJournalEntry.id,
          accountId: stockAccount.id,
          debitAmount: subtotal,
          creditAmount: 0,
          description: `Stock received - PO-${po.id}`,
        }),
        ...(taxAmount > 0
          ? [
              manager.create(JournalEntryLine, {
                journalEntryId: savedJournalEntry.id,
                accountId: taxAccount!.id,
                debitAmount: taxAmount,
                creditAmount: 0,
                description: `Purchase tax - PO-${po.id}`,
              }),
            ]
          : []),
        manager.create(JournalEntryLine, {
          journalEntryId: savedJournalEntry.id,
          accountId: payableAccount.id,
          debitAmount: 0,
          creditAmount: totalAmount,
          description: `Amount payable to ${supplierName} - PO-${po.id}`,
        }),
      ];
      await manager.save(JournalEntryLine, journalLines);

      await manager.update(RawMaterialPurchaseOrder, id, {
        status: 'received',
        storeId: dto.storeId,
        receivedAt: new Date(),
        receivedBy: dto.receivedBy,
      });

      const updated = await manager.findOne(RawMaterialPurchaseOrder, {
        where: { id },
        relations: RELATIONS,
      });
      return updated!;
    });
  }

  async cancel(id: number): Promise<RawMaterialPurchaseOrder> {
    const po = await this.findOne(id);
    if (po.status !== 'pending') {
      throw new ConflictException(`Purchase order is already ${po.status} and cannot be cancelled`);
    }
    await this.purchaseOrderRepository.update(id, { status: 'cancelled' });
    return this.findOne(id);
  }

  // ── Stores ──
  async findAllStores(): Promise<RawMaterialStore[]> {
    return this.storeRepository.find({ order: { name: 'ASC' } });
  }

  async createStore(dto: CreateStoreDto): Promise<RawMaterialStore> {
    const store = this.storeRepository.create({
      name: dto.name,
      location: dto.location ?? null,
    });
    return this.storeRepository.save(store);
  }

  async updateStore(id: number, dto: UpdateStoreDto): Promise<RawMaterialStore> {
    const store = await this.storeRepository.findOne({ where: { id } });
    if (!store) {
      throw new NotFoundException(`Store with ID ${id} not found`);
    }
    Object.assign(store, dto);
    return this.storeRepository.save(store);
  }

  async removeStore(id: number): Promise<void> {
    const store = await this.storeRepository.findOne({ where: { id } });
    if (!store) {
      throw new NotFoundException(`Store with ID ${id} not found`);
    }

    const inventoryCount = await this.dataSource
      .getRepository(RawMaterialStoreInventory)
      .count({ where: { storeId: id } });
    if (inventoryCount > 0) {
      throw new ConflictException(
        `Cannot delete "${store.name}" — it still holds inventory for ${inventoryCount} raw material${inventoryCount === 1 ? '' : 's'}.`,
      );
    }

    const purchaseOrderCount = await this.purchaseOrderRepository.count({ where: { storeId: id } });
    if (purchaseOrderCount > 0) {
      throw new ConflictException(
        `Cannot delete "${store.name}" — ${purchaseOrderCount} purchase order${purchaseOrderCount === 1 ? '' : 's'} reference it.`,
      );
    }

    await this.storeRepository.remove(store);
  }

  // ── Store inventory ──
  async findAllInventory(): Promise<RawMaterialStoreInventory[]> {
    return this.dataSource
      .getRepository(RawMaterialStoreInventory)
      .createQueryBuilder('inventory')
      .leftJoinAndSelect('inventory.rawMaterial', 'rawMaterial')
      .leftJoinAndSelect('inventory.store', 'store')
      .orderBy('rawMaterial.name', 'ASC')
      .addOrderBy('store.name', 'ASC')
      .getMany();
  }

  async findStoreInventory(storeId: number): Promise<RawMaterialStoreInventory[]> {
    return this.dataSource.getRepository(RawMaterialStoreInventory).find({
      where: { storeId },
      relations: ['rawMaterial', 'store'],
      order: { updatedAt: 'DESC' },
    });
  }

  async findInventoryLedger(): Promise<RawMaterialInventoryLedger[]> {
    return this.dataSource.getRepository(RawMaterialInventoryLedger).find({
      relations: ['store', 'rawMaterial', 'purchaseOrder'],
      order: { createdAt: 'DESC' },
      take: 500,
    });
  }
}
