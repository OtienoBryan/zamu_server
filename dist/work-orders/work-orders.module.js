"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkOrdersModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const work_orders_service_1 = require("./work-orders.service");
const work_orders_controller_1 = require("./work-orders.controller");
const work_order_entity_1 = require("../entities/work-order.entity");
const work_order_staff_entity_1 = require("../entities/work-order-staff.entity");
const work_order_material_entity_1 = require("../entities/work-order-material.entity");
const finished_product_entity_1 = require("../entities/finished-product.entity");
const finished_product_material_entity_1 = require("../entities/finished-product-material.entity");
const production_stage_entity_1 = require("../entities/production-stage.entity");
const staff_member_entity_1 = require("../entities/staff-member.entity");
const raw_material_store_entity_1 = require("../entities/raw-material-store.entity");
const raw_material_store_inventory_entity_1 = require("../entities/raw-material-store-inventory.entity");
const raw_material_inventory_ledger_entity_1 = require("../entities/raw-material-inventory-ledger.entity");
let WorkOrdersModule = class WorkOrdersModule {
};
exports.WorkOrdersModule = WorkOrdersModule;
exports.WorkOrdersModule = WorkOrdersModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([
                work_order_entity_1.WorkOrder,
                work_order_staff_entity_1.WorkOrderStaff,
                work_order_material_entity_1.WorkOrderMaterial,
                finished_product_entity_1.FinishedProduct,
                finished_product_material_entity_1.FinishedProductMaterial,
                production_stage_entity_1.ProductionStage,
                staff_member_entity_1.StaffMember,
                raw_material_store_entity_1.RawMaterialStore,
                raw_material_store_inventory_entity_1.RawMaterialStoreInventory,
                raw_material_inventory_ledger_entity_1.RawMaterialInventoryLedger,
            ])],
        controllers: [work_orders_controller_1.WorkOrdersController],
        providers: [work_orders_service_1.WorkOrdersService],
        exports: [work_orders_service_1.WorkOrdersService],
    })
], WorkOrdersModule);
//# sourceMappingURL=work-orders.module.js.map