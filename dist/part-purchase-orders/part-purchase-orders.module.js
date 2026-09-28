"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartPurchaseOrdersModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const part_purchase_orders_service_1 = require("./part-purchase-orders.service");
const part_purchase_orders_controller_1 = require("./part-purchase-orders.controller");
const part_purchase_order_entity_1 = require("../entities/part-purchase-order.entity");
const part_purchase_order_item_entity_1 = require("../entities/part-purchase-order-item.entity");
const inventory_entity_1 = require("../entities/inventory.entity");
const inventory_ledger_entity_1 = require("../entities/inventory-ledger.entity");
const vendor_entity_1 = require("../entities/vendor.entity");
const vendor_ledger_entity_1 = require("../entities/vendor-ledger.entity");
let PartPurchaseOrdersModule = class PartPurchaseOrdersModule {
};
exports.PartPurchaseOrdersModule = PartPurchaseOrdersModule;
exports.PartPurchaseOrdersModule = PartPurchaseOrdersModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([part_purchase_order_entity_1.PartPurchaseOrder, part_purchase_order_item_entity_1.PartPurchaseOrderItem, inventory_entity_1.Inventory, inventory_ledger_entity_1.InventoryLedger, vendor_entity_1.Vendor, vendor_ledger_entity_1.VendorLedger])],
        controllers: [part_purchase_orders_controller_1.PartPurchaseOrdersController],
        providers: [part_purchase_orders_service_1.PartPurchaseOrdersService],
        exports: [part_purchase_orders_service_1.PartPurchaseOrdersService],
    })
], PartPurchaseOrdersModule);
//# sourceMappingURL=part-purchase-orders.module.js.map