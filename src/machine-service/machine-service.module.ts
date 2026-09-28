import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MachineServiceService } from './machine-service.service';
import { MachineServiceController } from './machine-service.controller';
import { MachineServiceRecord } from '../entities/machine-service-record.entity';
import { MachineServicePart } from '../entities/machine-service-part.entity';
import { MachineServiceWorker } from '../entities/machine-service-worker.entity';
import { Machine } from '../entities/machine.entity';
import { RawMaterialStore } from '../entities/raw-material-store.entity';
import { SparePart } from '../entities/spare-part.entity';
import { SparePartStoreInventory } from '../entities/spare-part-store-inventory.entity';
import { SparePartInventoryLedger } from '../entities/spare-part-inventory-ledger.entity';
import { StaffMember } from '../entities/staff-member.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MachineServiceRecord,
      MachineServicePart,
      MachineServiceWorker,
      Machine,
      RawMaterialStore,
      SparePart,
      SparePartStoreInventory,
      SparePartInventoryLedger,
      StaffMember,
    ]),
  ],
  controllers: [MachineServiceController],
  providers: [MachineServiceService],
  exports: [MachineServiceService],
})
export class MachineServiceModule {}
