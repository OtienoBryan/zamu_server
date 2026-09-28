"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MachineInventoryModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const machine_inventory_service_1 = require("./machine-inventory.service");
const machine_inventory_controller_1 = require("./machine-inventory.controller");
const machine_store_inventory_entity_1 = require("../entities/machine-store-inventory.entity");
const machine_inventory_ledger_entity_1 = require("../entities/machine-inventory-ledger.entity");
const raw_material_store_entity_1 = require("../entities/raw-material-store.entity");
const machine_entity_1 = require("../entities/machine.entity");
let MachineInventoryModule = class MachineInventoryModule {
};
exports.MachineInventoryModule = MachineInventoryModule;
exports.MachineInventoryModule = MachineInventoryModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                machine_store_inventory_entity_1.MachineStoreInventory,
                machine_inventory_ledger_entity_1.MachineInventoryLedger,
                raw_material_store_entity_1.RawMaterialStore,
                machine_entity_1.Machine,
            ]),
        ],
        controllers: [machine_inventory_controller_1.MachineInventoryController],
        providers: [machine_inventory_service_1.MachineInventoryService],
        exports: [machine_inventory_service_1.MachineInventoryService],
    })
], MachineInventoryModule);
//# sourceMappingURL=machine-inventory.module.js.map