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
exports.Part = void 0;
const typeorm_1 = require("typeorm");
let Part = class Part {
    id;
    part_number;
    name;
    description;
    category;
    manufacturer;
    unit_price;
    unit_price_usd;
    stock_quantity;
    min_stock_level;
    location;
    unit;
    purchase_cost;
    selling_price;
    selling_price_usd;
    status;
    notes;
    image_url;
    created_at;
    updated_at;
};
exports.Part = Part;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Part.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, unique: true }),
    __metadata("design:type", String)
], Part.prototype, "part_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Part.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Part.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", Object)
], Part.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", Object)
], Part.prototype, "manufacturer", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true, transformer: {
            to: (value) => value,
            from: (value) => parseFloat(value)
        } }),
    __metadata("design:type", Object)
], Part.prototype, "unit_price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true, transformer: {
            to: (value) => value,
            from: (value) => value != null ? parseFloat(value) : null
        } }),
    __metadata("design:type", Object)
], Part.prototype, "unit_price_usd", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true, default: 0 }),
    __metadata("design:type", Object)
], Part.prototype, "stock_quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true, default: 0 }),
    __metadata("design:type", Object)
], Part.prototype, "min_stock_level", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", Object)
], Part.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", Object)
], Part.prototype, "unit", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true, transformer: {
            to: (value) => value,
            from: (value) => value != null ? parseFloat(value) : null
        } }),
    __metadata("design:type", Object)
], Part.prototype, "purchase_cost", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true, transformer: {
            to: (value) => value,
            from: (value) => value != null ? parseFloat(value) : null
        } }),
    __metadata("design:type", Object)
], Part.prototype, "selling_price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true, transformer: {
            to: (value) => value,
            from: (value) => value != null ? parseFloat(value) : null
        } }),
    __metadata("design:type", Object)
], Part.prototype, "selling_price_usd", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true, default: 'active' }),
    __metadata("design:type", Object)
], Part.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Part.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500, nullable: true }),
    __metadata("design:type", Object)
], Part.prototype, "image_url", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Part.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Part.prototype, "updated_at", void 0);
exports.Part = Part = __decorate([
    (0, typeorm_1.Entity)('Parts')
], Part);
//# sourceMappingURL=part.entity.js.map