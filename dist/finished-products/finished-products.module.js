"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinishedProductsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const finished_products_service_1 = require("./finished-products.service");
const finished_products_controller_1 = require("./finished-products.controller");
const finished_product_entity_1 = require("../entities/finished-product.entity");
const finished_product_category_entity_1 = require("../entities/finished-product-category.entity");
const finished_product_material_entity_1 = require("../entities/finished-product-material.entity");
const raw_material_entity_1 = require("../entities/raw-material.entity");
const cloudinary_module_1 = require("../cloudinary/cloudinary.module");
let FinishedProductsModule = class FinishedProductsModule {
};
exports.FinishedProductsModule = FinishedProductsModule;
exports.FinishedProductsModule = FinishedProductsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([finished_product_entity_1.FinishedProduct, finished_product_category_entity_1.FinishedProductCategory, finished_product_material_entity_1.FinishedProductMaterial, raw_material_entity_1.RawMaterial]),
            cloudinary_module_1.CloudinaryModule,
        ],
        controllers: [finished_products_controller_1.FinishedProductsController],
        providers: [finished_products_service_1.FinishedProductsService],
        exports: [finished_products_service_1.FinishedProductsService],
    })
], FinishedProductsModule);
//# sourceMappingURL=finished-products.module.js.map