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
exports.Job = void 0;
const typeorm_1 = require("typeorm");
const finished_product_entity_1 = require("./finished-product.entity");
let Job = class Job {
    id;
    productId;
    product;
    quantity;
    startDate;
    expectedEndDate;
    notes;
    status;
    createdAt;
    updatedAt;
};
exports.Job = Job;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Job.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'product_id', nullable: true }),
    __metadata("design:type", Object)
], Job.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => finished_product_entity_1.FinishedProduct),
    (0, typeorm_1.JoinColumn)({ name: 'product_id' }),
    __metadata("design:type", Object)
], Job.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2, nullable: true }),
    __metadata("design:type", Object)
], Job.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'start_date', type: 'date', nullable: true }),
    __metadata("design:type", Object)
], Job.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'expected_end_date', type: 'date', nullable: true }),
    __metadata("design:type", Object)
], Job.prototype, "expectedEndDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Job.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['open', 'completed', 'cancelled'], default: 'open' }),
    __metadata("design:type", String)
], Job.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Job.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Job.prototype, "updatedAt", void 0);
exports.Job = Job = __decorate([
    (0, typeorm_1.Entity)('jobs')
], Job);
//# sourceMappingURL=job.entity.js.map