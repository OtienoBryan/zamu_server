"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseOrdersModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const purchase_orders_service_1 = require("./purchase-orders.service");
const purchase_orders_controller_1 = require("./purchase-orders.controller");
const raw_material_purchase_order_entity_1 = require("../entities/raw-material-purchase-order.entity");
const raw_material_purchase_order_item_entity_1 = require("../entities/raw-material-purchase-order-item.entity");
const raw_material_store_entity_1 = require("../entities/raw-material-store.entity");
const raw_material_store_inventory_entity_1 = require("../entities/raw-material-store-inventory.entity");
const raw_material_inventory_ledger_entity_1 = require("../entities/raw-material-inventory-ledger.entity");
const raw_material_entity_1 = require("../entities/raw-material.entity");
const supplier_entity_1 = require("../entities/supplier.entity");
const supplier_ledger_entity_1 = require("../entities/supplier-ledger.entity");
const chart_of_account_entity_1 = require("../entities/chart-of-account.entity");
const journal_entry_entity_1 = require("../entities/journal-entry.entity");
const journal_entry_line_entity_1 = require("../entities/journal-entry-line.entity");
let PurchaseOrdersModule = class PurchaseOrdersModule {
};
exports.PurchaseOrdersModule = PurchaseOrdersModule;
exports.PurchaseOrdersModule = PurchaseOrdersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                raw_material_purchase_order_entity_1.RawMaterialPurchaseOrder,
                raw_material_purchase_order_item_entity_1.RawMaterialPurchaseOrderItem,
                raw_material_store_entity_1.RawMaterialStore,
                raw_material_store_inventory_entity_1.RawMaterialStoreInventory,
                raw_material_inventory_ledger_entity_1.RawMaterialInventoryLedger,
                raw_material_entity_1.RawMaterial,
                supplier_entity_1.Supplier,
                supplier_ledger_entity_1.SupplierLedger,
                chart_of_account_entity_1.ChartOfAccount,
                journal_entry_entity_1.JournalEntry,
                journal_entry_line_entity_1.JournalEntryLine,
            ]),
        ],
        controllers: [purchase_orders_controller_1.PurchaseOrdersController],
        providers: [purchase_orders_service_1.PurchaseOrdersService],
        exports: [purchase_orders_service_1.PurchaseOrdersService],
    })
], PurchaseOrdersModule);
//# sourceMappingURL=purchase-orders.module.js.map