"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinishedProductMaterial = void 0;
const typeorm_1 = require("typeorm");
const finished_product_entity_1 = require("./finished-product.entity");
const raw_material_entity_1 = require("./raw-material.entity");
let FinishedProductMaterial = class FinishedProductMaterial {
    id;
    finishedProductId;
    finishedProduct;
    rawMaterialId;
    rawMaterial;
    quantity;
    createdAt;
    updatedAt;
};
exports.FinishedProductMaterial = FinishedProductMaterial;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], FinishedProductMaterial.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'finished_product_id' }),
    __metadata("design:type", Number)
], FinishedProductMaterial.prototype, "finishedProductId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => finished_product_entity_1.FinishedProduct, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'finished_product_id' }),
    __metadata("design:type", finished_product_entity_1.FinishedProduct)
], FinishedProductMaterial.prototype, "finishedProduct", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'raw_material_id' }),
    __metadata("design:type", Number)
], FinishedProductMaterial.prototype, "rawMaterialId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => raw_material_entity_1.RawMaterial),
    (0, typeorm_1.JoinColumn)({ name: 'raw_material_id' }),
    __metadata("design:type", raw_material_entity_1.RawMaterial)
], FinishedProductMaterial.prototype, "rawMaterial", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], FinishedProductMaterial.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], FinishedProductMaterial.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], FinishedProductMaterial.prototype, "updatedAt", void 0);
exports.FinishedProductMaterial = FinishedProductMaterial = __decorate([
    (0, typeorm_1.Entity)('finished_product_materials')
], FinishedProductMaterial);
//# sourceMappingURL=finished-product-material.entity.js.map