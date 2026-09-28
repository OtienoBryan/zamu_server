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
exports.JobCardPayment = void 0;
const typeorm_1 = require("typeorm");
const job_card_entity_1 = require("./job-card.entity");
const staff_entity_1 = require("./staff.entity");
let JobCardPayment = class JobCardPayment {
    id;
    job_card_id;
    jobCard;
    amount;
    payment_method;
    reference;
    payment_date;
    notes;
    posted_by;
    postedBy;
    created_at;
};
exports.JobCardPayment = JobCardPayment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], JobCardPayment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'job_card_id', type: 'int' }),
    __metadata("design:type", Number)
], JobCardPayment.prototype, "job_card_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => job_card_entity_1.JobCard),
    (0, typeorm_1.JoinColumn)({ name: 'job_card_id' }),
    __metadata("design:type", job_card_entity_1.JobCard)
], JobCardPayment.prototype, "jobCard", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2, transformer: {
            to: (value) => value,
            from: (value) => parseFloat(value)
        } }),
    __metadata("design:type", Number)
], JobCardPayment.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['cash', 'mobile_money', 'card', 'bank_transfer', 'cheque', 'other'] }),
    __metadata("design:type", String)
], JobCardPayment.prototype, "payment_method", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", Object)
], JobCardPayment.prototype, "reference", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", String)
], JobCardPayment.prototype, "payment_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], JobCardPayment.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'posted_by', type: 'int', nullable: true }),
    __metadata("design:type", Object)
], JobCardPayment.prototype, "posted_by", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => staff_entity_1.Staff),
    (0, typeorm_1.JoinColumn)({ name: 'posted_by' }),
    __metadata("design:type", staff_entity_1.Staff)
], JobCardPayment.prototype, "postedBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], JobCardPayment.prototype, "created_at", void 0);
exports.JobCardPayment = JobCardPayment = __decorate([
    (0, typeorm_1.Entity)('job_card_payments')
], JobCardPayment);
//# sourceMappingURL=job-card-payment.entity.js.map