"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StationTanksModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const station_tanks_service_1 = require("./station-tanks.service");
const station_tanks_controller_1 = require("./station-tanks.controller");
const station_tank_entity_1 = require("../entities/station-tank.entity");
const station_entity_1 = require("../entities/station.entity");
let StationTanksModule = class StationTanksModule {
};
exports.StationTanksModule = StationTanksModule;
exports.StationTanksModule = StationTanksModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([station_tank_entity_1.StationTank, station_entity_1.Station])],
        controllers: [station_tanks_controller_1.StationTanksController],
        providers: [station_tanks_service_1.StationTanksService],
        exports: [station_tanks_service_1.StationTanksService],
    })
], StationTanksModule);
//# sourceMappingURL=station-tanks.module.js.map