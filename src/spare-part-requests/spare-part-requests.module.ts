import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SparePartRequestsService } from './spare-part-requests.service';
import { SparePartRequestsController } from './spare-part-requests.controller';
import { SparePartRequest } from '../entities/spare-part-request.entity';
import { SparePartRequestItem } from '../entities/spare-part-request-item.entity';
import { RawMaterialStore } from '../entities/raw-material-store.entity';
import { SparePart } from '../entities/spare-part.entity';
import { SparePartStoreInventory } from '../entities/spare-part-store-inventory.entity';
import { SparePartInventoryLedger } from '../entities/spare-part-inventory-ledger.entity';
import { Machine } from '../entities/machine.entity';
import { StaffMember } from '../entities/staff-member.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SparePartRequest,
      SparePartRequestItem,
      RawMaterialStore,
      SparePart,
      SparePartStoreInventory,
      SparePartInventoryLedger,
      Machine,
      StaffMember,
    ]),
  ],
  controllers: [SparePartRequestsController],
  providers: [SparePartRequestsService],
  exports: [SparePartRequestsService],
})
export class SparePartRequestsModule {}
