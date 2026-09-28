"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SparePartInventoryModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const spare_part_inventory_service_1 = require("./spare-part-inventory.service");
const spare_part_inventory_controller_1 = require("./spare-part-inventory.controller");
const spare_part_store_inventory_entity_1 = require("../entities/spare-part-store-inventory.entity");
const spare_part_inventory_ledger_entity_1 = require("../entities/spare-part-inventory-ledger.entity");
const raw_material_store_entity_1 = require("../entities/raw-material-store.entity");
const spare_part_entity_1 = require("../entities/spare-part.entity");
let SparePartInventoryModule = class SparePartInventoryModule {
};
exports.SparePartInventoryModule = SparePartInventoryModule;
exports.SparePartInventoryModule = SparePartInventoryModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                spare_part_store_inventory_entity_1.SparePartStoreInventory,
                spare_part_inventory_ledger_entity_1.SparePartInventoryLedger,
                raw_material_store_entity_1.RawMaterialStore,
                spare_part_entity_1.SparePart,
            ]),
        ],
        controllers: [spare_part_inventory_controller_1.SparePartInventoryController],
        providers: [spare_part_inventory_service_1.SparePartInventoryService],
        exports: [spare_part_inventory_service_1.SparePartInventoryService],
    })
], SparePartInventoryModule);
//# sourceMappingURL=spare-part-inventory.module.js.map