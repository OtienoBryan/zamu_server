"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkOrderWasteModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const work_order_waste_service_1 = require("./work-order-waste.service");
const work_order_waste_controller_1 = require("./work-order-waste.controller");
const work_order_waste_entity_1 = require("../entities/work-order-waste.entity");
const work_order_entity_1 = require("../entities/work-order.entity");
const raw_material_store_entity_1 = require("../entities/raw-material-store.entity");
const raw_material_store_inventory_entity_1 = require("../entities/raw-material-store-inventory.entity");
const raw_material_inventory_ledger_entity_1 = require("../entities/raw-material-inventory-ledger.entity");
let WorkOrderWasteModule = class WorkOrderWasteModule {
};
exports.WorkOrderWasteModule = WorkOrderWasteModule;
exports.WorkOrderWasteModule = WorkOrderWasteModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([work_order_waste_entity_1.WorkOrderWasteEntry, work_order_entity_1.WorkOrder, raw_material_store_entity_1.RawMaterialStore, raw_material_store_inventory_entity_1.RawMaterialStoreInventory, raw_material_inventory_ledger_entity_1.RawMaterialInventoryLedger]),
        ],
        controllers: [work_order_waste_controller_1.WorkOrderWasteController],
        providers: [work_order_waste_service_1.WorkOrderWasteService],
        exports: [work_order_waste_service_1.WorkOrderWasteService],
    })
], WorkOrderWasteModule);
//# sourceMappingURL=work-order-waste.module.js.map