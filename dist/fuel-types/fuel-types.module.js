"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FuelTypesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const fuel_types_service_1 = require("./fuel-types.service");
const fuel_types_controller_1 = require("./fuel-types.controller");
const fuel_type_entity_1 = require("../entities/fuel-type.entity");
let FuelTypesModule = class FuelTypesModule {
};
exports.FuelTypesModule = FuelTypesModule;
exports.FuelTypesModule = FuelTypesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([fuel_type_entity_1.FuelType])],
        controllers: [fuel_types_controller_1.FuelTypesController],
        providers: [fuel_types_service_1.FuelTypesService],
        exports: [fuel_types_service_1.FuelTypesService],
    })
], FuelTypesModule);
//# sourceMappingURL=fuel-types.module.js.map