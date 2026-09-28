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
exports.JobCardItem = void 0;
const typeorm_1 = require("typeorm");
const job_card_entity_1 = require("./job-card.entity");
const part_entity_1 = require("./part.entity");
const service_entity_1 = require("./service.entity");
const staff_entity_1 = require("./staff.entity");
let JobCardItem = class JobCardItem {
    id;
    job_card_id;
    jobCard;
    item_type;
    part_id;
    part;
    service_id;
    service;
    assigned_staff_id;
    assignedStaff;
    assigned_at;
    description;
    cost;
    price;
    quantity;
    taxable;
    amount;
    created_at;
};
exports.JobCardItem = JobCardItem;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], JobCardItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'job_card_id', type: 'int' }),
    __metadata("design:type", Number)
], JobCardItem.prototype, "job_card_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => job_card_entity_1.JobCard, jobCard => jobCard.items, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'job_card_id' }),
    __metadata("design:type", job_card_entity_1.JobCard)
], JobCardItem.prototype, "jobCard", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['part', 'labor'] }),
    __metadata("design:type", String)
], JobCardItem.prototype, "item_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'part_id', type: 'int', nullable: true }),
    __metadata("design:type", Object)
], JobCardItem.prototype, "part_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => part_entity_1.Part),
    (0, typeorm_1.JoinColumn)({ name: 'part_id' }),
    __metadata("design:type", part_entity_1.Part)
], JobCardItem.prototype, "part", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'service_id', type: 'int', nullable: true }),
    __metadata("design:type", Object)
], JobCardItem.prototype, "service_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => service_entity_1.Service),
    (0, typeorm_1.JoinColumn)({ name: 'service_id' }),
    __metadata("design:type", service_entity_1.Service)
], JobCardItem.prototype, "service", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'assigned_staff_id', type: 'int', nullable: true }),
    __metadata("design:type", Object)
], JobCardItem.prototype, "assigned_staff_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => staff_entity_1.Staff),
    (0, typeorm_1.JoinColumn)({ name: 'assigned_staff_id' }),
    __metadata("design:type", staff_entity_1.Staff)
], JobCardItem.prototype, "assignedStaff", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', nullable: true }),
    __metadata("design:type", Object)
], JobCardItem.prototype, "assigned_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], JobCardItem.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0, transformer: {
            to: (value) => value,
            from: (value) => value != null ? parseFloat(value) : 0
        } }),
    __metadata("design:type", Number)
], JobCardItem.prototype, "cost", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0, transformer: {
            to: (value) => value,
            from: (value) => parseFloat(value)
        } }),
    __metadata("design:type", Number)
], JobCardItem.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 1, transformer: {
            to: (value) => value,
            from: (value) => parseFloat(value)
        } }),
    __metadata("design:type", Number)
], JobCardItem.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 1 }),
    __metadata("design:type", Number)
], JobCardItem.prototype, "taxable", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0, transformer: {
            to: (value) => value,
            from: (value) => parseFloat(value)
        } }),
    __metadata("design:type", Number)
], JobCardItem.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], JobCardItem.prototype, "created_at", void 0);
exports.JobCardItem = JobCardItem = __decorate([
    (0, typeorm_1.Entity)('job_card_items')
], JobCardItem);
//# sourceMappingURL=job-card-item.entity.js.map