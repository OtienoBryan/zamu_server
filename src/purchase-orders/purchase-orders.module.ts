import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseOrdersService } from './purchase-orders.service';
import { PurchaseOrdersController } from './purchase-orders.controller';
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

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RawMaterialPurchaseOrder,
      RawMaterialPurchaseOrderItem,
      RawMaterialStore,
      RawMaterialStoreInventory,
      RawMaterialInventoryLedger,
      RawMaterial,
      Supplier,
      SupplierLedger,
      ChartOfAccount,
      JournalEntry,
      JournalEntryLine,
    ]),
  ],
  controllers: [PurchaseOrdersController],
  providers: [PurchaseOrdersService],
  exports: [PurchaseOrdersService],
})
export class PurchaseOrdersModule {}
