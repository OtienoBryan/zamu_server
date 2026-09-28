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
exports.RawMaterial = void 0;
const typeorm_1 = require("typeorm");
const raw_material_category_entity_1 = require("./raw-material-category.entity");
let RawMaterial = class RawMaterial {
    id;
    name;
    categoryId;
    category;
    unitOfMeasure;
    alertQuantity;
    description;
    cost;
    status;
    createdAt;
    updatedAt;
};
exports.RawMaterial = RawMaterial;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RawMaterial.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 150 }),
    __metadata("design:type", String)
], RawMaterial.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'category_id', nullable: true }),
    __metadata("design:type", Object)
], RawMaterial.prototype, "categoryId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => raw_material_category_entity_1.RawMaterialCategory),
    (0, typeorm_1.JoinColumn)({ name: 'category_id' }),
    __metadata("design:type", Object)
], RawMaterial.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'unit_of_measure', length: 20 }),
    __metadata("design:type", String)
], RawMaterial.prototype, "unitOfMeasure", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'alert_quantity', type: 'decimal', precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], RawMaterial.prototype, "alertQuantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], RawMaterial.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], RawMaterial.prototype, "cost", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['active', 'inactive'], default: 'active' }),
    __metadata("design:type", String)
], RawMaterial.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], RawMaterial.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], RawMaterial.prototype, "updatedAt", void 0);
exports.RawMaterial = RawMaterial = __decorate([
    (0, typeorm_1.Entity)('raw_materials')
], RawMaterial);
//# sourceMappingURL=raw-material.entity.js.map