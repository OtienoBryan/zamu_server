"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductionStagesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const production_stages_service_1 = require("./production-stages.service");
const production_stages_controller_1 = require("./production-stages.controller");
const production_stage_entity_1 = require("../entities/production-stage.entity");
let ProductionStagesModule = class ProductionStagesModule {
};
exports.ProductionStagesModule = ProductionStagesModule;
exports.ProductionStagesModule = ProductionStagesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([production_stage_entity_1.ProductionStage])],
        controllers: [production_stages_controller_1.ProductionStagesController],
        providers: [production_stages_service_1.ProductionStagesService],
        exports: [production_stages_service_1.ProductionStagesService],
    })
], ProductionStagesModule);
//# sourceMappingURL=production-stages.module.js.map