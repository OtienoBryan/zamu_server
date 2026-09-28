"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RawMaterialsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const raw_materials_service_1 = require("./raw-materials.service");
const raw_materials_controller_1 = require("./raw-materials.controller");
const raw_material_entity_1 = require("../entities/raw-material.entity");
const raw_material_category_entity_1 = require("../entities/raw-material-category.entity");
let RawMaterialsModule = class RawMaterialsModule {
};
exports.RawMaterialsModule = RawMaterialsModule;
exports.RawMaterialsModule = RawMaterialsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([raw_material_entity_1.RawMaterial, raw_material_category_entity_1.RawMaterialCategory])],
        controllers: [raw_materials_controller_1.RawMaterialsController],
        providers: [raw_materials_service_1.RawMaterialsService],
        exports: [raw_materials_service_1.RawMaterialsService],
    })
], RawMaterialsModule);
//# sourceMappingURL=raw-materials.module.js.map