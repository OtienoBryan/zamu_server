import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartPurchaseOrdersService } from './part-purchase-orders.service';
import { PartPurchaseOrdersController } from './part-purchase-orders.controller';
import { PartPurchaseOrder } from '../entities/part-purchase-order.entity';
import { PartPurchaseOrderItem } from '../entities/part-purchase-order-item.entity';
import { Inventory } from '../entities/inventory.entity';
import { InventoryLedger } from '../entities/inventory-ledger.entity';
import { Vendor } from '../entities/vendor.entity';
import { VendorLedger } from '../entities/vendor-ledger.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PartPurchaseOrder, PartPurchaseOrderItem, Inventory, InventoryLedger, Vendor, VendorLedger])],
  controllers: [PartPurchaseOrdersController],
  providers: [PartPurchaseOrdersService],
  exports: [PartPurchaseOrdersService],
})
export class PartPurchaseOrdersModule {}
