import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MachineInventoryService } from './machine-inventory.service';
import { MachineInventoryController } from './machine-inventory.controller';
import { MachineStoreInventory } from '../entities/machine-store-inventory.entity';
import { MachineInventoryLedger } from '../entities/machine-inventory-ledger.entity';
import { RawMaterialStore } from '../entities/raw-material-store.entity';
import { Machine } from '../entities/machine.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MachineStoreInventory,
      MachineInventoryLedger,
      RawMaterialStore,
      Machine,
    ]),
  ],
  controllers: [MachineInventoryController],
  providers: [MachineInventoryService],
  exports: [MachineInventoryService],
})
export class MachineInventoryModule {}
