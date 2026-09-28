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
exports.FinishedProduct = void 0;
const typeorm_1 = require("typeorm");
const finished_product_category_entity_1 = require("./finished-product-category.entity");
let FinishedProduct = class FinishedProduct {
    id;
    name;
    description;
    imageUrl;
    imagePublicId;
    sellingPrice;
    productionCost;
    status;
    categoryId;
    color;
    category;
    createdAt;
    updatedAt;
};
exports.FinishedProduct = FinishedProduct;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], FinishedProduct.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 150 }),
    __metadata("design:type", String)
], FinishedProduct.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], FinishedProduct.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'image_url', type: 'varchar', length: 500, nullable: true }),
    __metadata("design:type", Object)
], FinishedProduct.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'image_public_id', type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", Object)
], FinishedProduct.prototype, "imagePublicId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'selling_price', type: 'decimal', precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], FinishedProduct.prototype, "sellingPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'production_cost', type: 'decimal', precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], FinishedProduct.prototype, "productionCost", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['active', 'inactive'], default: 'active' }),
    __metadata("design:type", String)
], FinishedProduct.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'category_id', nullable: true }),
    __metadata("design:type", Object)
], FinishedProduct.prototype, "categoryId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", Object)
], FinishedProduct.prototype, "color", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => finished_product_category_entity_1.FinishedProductCategory),
    (0, typeorm_1.JoinColumn)({ name: 'category_id' }),
    __metadata("design:type", Object)
], FinishedProduct.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], FinishedProduct.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], FinishedProduct.prototype, "updatedAt", void 0);
exports.FinishedProduct = FinishedProduct = __decorate([
    (0, typeorm_1.Entity)('finished_products')
], FinishedProduct);
//# sourceMappingURL=finished-product.entity.js.map