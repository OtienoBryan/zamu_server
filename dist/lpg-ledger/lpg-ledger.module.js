"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LpgLedgerModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const lpg_ledger_service_1 = require("./lpg-ledger.service");
const lpg_ledger_controller_1 = require("./lpg-ledger.controller");
const station_lpg_ledger_entity_1 = require("../entities/station-lpg-ledger.entity");
let LpgLedgerModule = class LpgLedgerModule {
};
exports.LpgLedgerModule = LpgLedgerModule;
exports.LpgLedgerModule = LpgLedgerModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([station_lpg_ledger_entity_1.StationLpgLedger])],
        controllers: [lpg_ledger_controller_1.LpgLedgerController],
        providers: [lpg_ledger_service_1.LpgLedgerService],
        exports: [lpg_ledger_service_1.LpgLedgerService],
    })
], LpgLedgerModule);
//# sourceMappingURL=lpg-ledger.module.js.map