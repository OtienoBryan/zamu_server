"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MachineServiceModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const machine_service_service_1 = require("./machine-service.service");
const machine_service_controller_1 = require("./machine-service.controller");
const machine_service_record_entity_1 = require("../entities/machine-service-record.entity");
const machine_service_part_entity_1 = require("../entities/machine-service-part.entity");
const machine_service_worker_entity_1 = require("../entities/machine-service-worker.entity");
const machine_entity_1 = require("../entities/machine.entity");
const raw_material_store_entity_1 = require("../entities/raw-material-store.entity");
const spare_part_entity_1 = require("../entities/spare-part.entity");
const spare_part_store_inventory_entity_1 = require("../entities/spare-part-store-inventory.entity");
const spare_part_inventory_ledger_entity_1 = require("../entities/spare-part-inventory-ledger.entity");
const staff_member_entity_1 = require("../entities/staff-member.entity");
let MachineServiceModule = class MachineServiceModule {
};
exports.MachineServiceModule = MachineServiceModule;
exports.MachineServiceModule = MachineServiceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                machine_service_record_entity_1.MachineServiceRecord,
                machine_service_part_entity_1.MachineServicePart,
                machine_service_worker_entity_1.MachineServiceWorker,
                machine_entity_1.Machine,
                raw_material_store_entity_1.RawMaterialStore,
                spare_part_entity_1.SparePart,
                spare_part_store_inventory_entity_1.SparePartStoreInventory,
                spare_part_inventory_ledger_entity_1.SparePartInventoryLedger,
                staff_member_entity_1.StaffMember,
            ]),
        ],
        controllers: [machine_service_controller_1.MachineServiceController],
        providers: [machine_service_service_1.MachineServiceService],
        exports: [machine_service_service_1.MachineServiceService],
    })
], MachineServiceModule);
//# sourceMappingURL=machine-service.module.js.map