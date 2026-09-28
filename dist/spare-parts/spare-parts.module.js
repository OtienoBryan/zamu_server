"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SparePartsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const spare_parts_service_1 = require("./spare-parts.service");
const spare_parts_controller_1 = require("./spare-parts.controller");
const spare_part_entity_1 = require("../entities/spare-part.entity");
const spare_part_category_entity_1 = require("../entities/spare-part-category.entity");
let SparePartsModule = class SparePartsModule {
};
exports.SparePartsModule = SparePartsModule;
exports.SparePartsModule = SparePartsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([spare_part_entity_1.SparePart, spare_part_category_entity_1.SparePartCategory])],
        controllers: [spare_parts_controller_1.SparePartsController],
        providers: [spare_parts_service_1.SparePartsService],
        exports: [spare_parts_service_1.SparePartsService],
    })
], SparePartsModule);
//# sourceMappingURL=spare-parts.module.js.map