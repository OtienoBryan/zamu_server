import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinishedProductInventoryService } from './finished-product-inventory.service';
import { FinishedProductInventoryController } from './finished-product-inventory.controller';
import { FinishedProductStoreInventory } from '../entities/finished-product-store-inventory.entity';
import { FinishedProductInventoryLedger } from '../entities/finished-product-inventory-ledger.entity';
import { RawMaterialStore } from '../entities/raw-material-store.entity';
import { FinishedProduct } from '../entities/finished-product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FinishedProductStoreInventory,
      FinishedProductInventoryLedger,
      RawMaterialStore,
      FinishedProduct,
    ]),
  ],
  controllers: [FinishedProductInventoryController],
  providers: [FinishedProductInventoryService],
  exports: [FinishedProductInventoryService],
})
export class FinishedProductInventoryModule {}
