import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryService } from './inventory.service';
import { Inventory } from '../entities/inventory.entity';
import { InventoryLedger } from '../entities/inventory-ledger.entity';

// No controller here: the `parts_inventory` / `inventory_ledger` tables this
// service reads/writes don't exist in this database (legacy leftover from a
// different project). InventoryService.recordTransaction() is still used
// in-process by JobCardsService, so the service, its entities and this
// module stay — only the dead `/inventory` HTTP surface is removed.
@Module({
  imports: [TypeOrmModule.forFeature([Inventory, InventoryLedger])],
  providers: [InventoryService],
  exports: [InventoryService],
})
export class InventoryModule {}
