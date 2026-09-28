import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkOrdersService } from './work-orders.service';
import { WorkOrdersController } from './work-orders.controller';
import { WorkOrder } from '../entities/work-order.entity';
import { WorkOrderStaff } from '../entities/work-order-staff.entity';
import { WorkOrderMaterial } from '../entities/work-order-material.entity';
import { FinishedProduct } from '../entities/finished-product.entity';
import { FinishedProductMaterial } from '../entities/finished-product-material.entity';
import { ProductionStage } from '../entities/production-stage.entity';
import { StaffMember } from '../entities/staff-member.entity';
import { RawMaterialStore } from '../entities/raw-material-store.entity';
import { RawMaterialStoreInventory } from '../entities/raw-material-store-inventory.entity';
import { RawMaterialInventoryLedger } from '../entities/raw-material-inventory-ledger.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    WorkOrder,
    WorkOrderStaff,
    WorkOrderMaterial,
    FinishedProduct,
    FinishedProductMaterial,
    ProductionStage,
    StaffMember,
    RawMaterialStore,
    RawMaterialStoreInventory,
    RawMaterialInventoryLedger,
  ])],
  controllers: [WorkOrdersController],
  providers: [WorkOrdersService],
  exports: [WorkOrdersService],
})
export class WorkOrdersModule {}
