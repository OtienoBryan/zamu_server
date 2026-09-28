import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkOrderWasteService } from './work-order-waste.service';
import { WorkOrderWasteController } from './work-order-waste.controller';
import { WorkOrderWasteEntry } from '../entities/work-order-waste.entity';
import { WorkOrder } from '../entities/work-order.entity';
import { RawMaterialStore } from '../entities/raw-material-store.entity';
import { RawMaterialStoreInventory } from '../entities/raw-material-store-inventory.entity';
import { RawMaterialInventoryLedger } from '../entities/raw-material-inventory-ledger.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([WorkOrderWasteEntry, WorkOrder, RawMaterialStore, RawMaterialStoreInventory, RawMaterialInventoryLedger]),
  ],
  controllers: [WorkOrderWasteController],
  providers: [WorkOrderWasteService],
  exports: [WorkOrderWasteService],
})
export class WorkOrderWasteModule {}
