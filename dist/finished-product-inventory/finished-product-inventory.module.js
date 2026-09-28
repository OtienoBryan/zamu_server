"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinishedProductInventoryModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const finished_product_inventory_service_1 = require("./finished-product-inventory.service");
const finished_product_inventory_controller_1 = require("./finished-product-inventory.controller");
const finished_product_store_inventory_entity_1 = require("../entities/finished-product-store-inventory.entity");
const finished_product_inventory_ledger_entity_1 = require("../entities/finished-product-inventory-ledger.entity");
const raw_material_store_entity_1 = require("../entities/raw-material-store.entity");
const finished_product_entity_1 = require("../entities/finished-product.entity");
let FinishedProductInventoryModule = class FinishedProductInventoryModule {
};
exports.FinishedProductInventoryModule = FinishedProductInventoryModule;
exports.FinishedProductInventoryModule = FinishedProductInventoryModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                finished_product_store_inventory_entity_1.FinishedProductStoreInventory,
                finished_product_inventory_ledger_entity_1.FinishedProductInventoryLedger,
                raw_material_store_entity_1.RawMaterialStore,
                finished_product_entity_1.FinishedProduct,
            ]),
        ],
        controllers: [finished_product_inventory_controller_1.FinishedProductInventoryController],
        providers: [finished_product_inventory_service_1.FinishedProductInventoryService],
        exports: [finished_product_inventory_service_1.FinishedProductInventoryService],
    })
], FinishedProductInventoryModule);
//# sourceMappingURL=finished-product-inventory.module.js.map