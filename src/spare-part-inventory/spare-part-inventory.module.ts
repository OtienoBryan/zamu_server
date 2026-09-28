import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SparePartInventoryService } from './spare-part-inventory.service';
import { SparePartInventoryController } from './spare-part-inventory.controller';
import { SparePartStoreInventory } from '../entities/spare-part-store-inventory.entity';
import { SparePartInventoryLedger } from '../entities/spare-part-inventory-ledger.entity';
import { RawMaterialStore } from '../entities/raw-material-store.entity';
import { SparePart } from '../entities/spare-part.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SparePartStoreInventory,
      SparePartInventoryLedger,
      RawMaterialStore,
      SparePart,
    ]),
  ],
  controllers: [SparePartInventoryController],
  providers: [SparePartInventoryService],
  exports: [SparePartInventoryService],
})
export class SparePartInventoryModule {}
