import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PosSalesService } from './pos-sales.service';
import { PosSalesController } from './pos-sales.controller';
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
import { Staff } from '../entities/staff.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PosSale,
      PosSaleItem,
      FinishedProduct,
      ClientRecord,
      RawMaterialStore,
      FinishedProductStoreInventory,
      FinishedProductInventoryLedger,
      ChartOfAccount,
      JournalEntry,
      JournalEntryLine,
      Staff,
    ]),
  ],
  controllers: [PosSalesController],
  providers: [PosSalesService],
  exports: [PosSalesService],
})
export class PosSalesModule {}
