"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversionVehiclesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const conversion_vehicles_service_1 = require("./conversion-vehicles.service");
const vehicle_analysis_service_1 = require("./services/vehicle-analysis.service");
const conversion_vehicles_controller_1 = require("./conversion-vehicles.controller");
const conversion_vehicle_entity_1 = require("../entities/conversion-vehicle.entity");
const conversion_client_entity_1 = require("../entities/conversion-client.entity");
let ConversionVehiclesModule = class ConversionVehiclesModule {
};
exports.ConversionVehiclesModule = ConversionVehiclesModule;
exports.ConversionVehiclesModule = ConversionVehiclesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([conversion_vehicle_entity_1.ConversionVehicle, conversion_client_entity_1.ConversionClient])],
        controllers: [conversion_vehicles_controller_1.ConversionVehiclesController],
        providers: [conversion_vehicles_service_1.ConversionVehiclesService, vehicle_analysis_service_1.VehicleAnalysisService],
        exports: [conversion_vehicles_service_1.ConversionVehiclesService, vehicle_analysis_service_1.VehicleAnalysisService],
    })
], ConversionVehiclesModule);
//# sourceMappingURL=conversion-vehicles.module.js.map