"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PosSalesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const pos_sales_service_1 = require("./pos-sales.service");
const pos_sales_controller_1 = require("./pos-sales.controller");
const pos_sale_entity_1 = require("../entities/pos-sale.entity");
const pos_sale_item_entity_1 = require("../entities/pos-sale-item.entity");
const finished_product_entity_1 = require("../entities/finished-product.entity");
const client_record_entity_1 = require("../entities/client-record.entity");
const raw_material_store_entity_1 = require("../entities/raw-material-store.entity");
const finished_product_store_inventory_entity_1 = require("../entities/finished-product-store-inventory.entity");
const finished_product_inventory_ledger_entity_1 = require("../entities/finished-product-inventory-ledger.entity");
const chart_of_account_entity_1 = require("../entities/chart-of-account.entity");
const journal_entry_entity_1 = require("../entities/journal-entry.entity");
const journal_entry_line_entity_1 = require("../entities/journal-entry-line.entity");
const staff_entity_1 = require("../entities/staff.entity");
let PosSalesModule = class PosSalesModule {
};
exports.PosSalesModule = PosSalesModule;
exports.PosSalesModule = PosSalesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                pos_sale_entity_1.PosSale,
                pos_sale_item_entity_1.PosSaleItem,
                finished_product_entity_1.FinishedProduct,
                client_record_entity_1.ClientRecord,
                raw_material_store_entity_1.RawMaterialStore,
                finished_product_store_inventory_entity_1.FinishedProductStoreInventory,
                finished_product_inventory_ledger_entity_1.FinishedProductInventoryLedger,
                chart_of_account_entity_1.ChartOfAccount,
                journal_entry_entity_1.JournalEntry,
                journal_entry_line_entity_1.JournalEntryLine,
                staff_entity_1.Staff,
            ]),
        ],
        controllers: [pos_sales_controller_1.PosSalesController],
        providers: [pos_sales_service_1.PosSalesService],
        exports: [pos_sales_service_1.PosSalesService],
    })
], PosSalesModule);
//# sourceMappingURL=pos-sales.module.js.map