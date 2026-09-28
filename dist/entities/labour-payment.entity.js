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
exports.LabourPayment = void 0;
const typeorm_1 = require("typeorm");
const work_order_log_entity_1 = require("./work-order-log.entity");
const staff_member_entity_1 = require("./staff-member.entity");
const chart_of_account_entity_1 = require("./chart-of-account.entity");
let LabourPayment = class LabourPayment {
    id;
    workOrderLogId;
    workOrderLog;
    staffId;
    staff;
    paymentAccountId;
    paymentAccount;
    amount;
    paymentDate;
    notes;
    createdAt;
    updatedAt;
};
exports.LabourPayment = LabourPayment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], LabourPayment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'work_order_log_id' }),
    __metadata("design:type", Number)
], LabourPayment.prototype, "workOrderLogId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => work_order_log_entity_1.WorkOrderLog),
    (0, typeorm_1.JoinColumn)({ name: 'work_order_log_id' }),
    __metadata("design:type", work_order_log_entity_1.WorkOrderLog)
], LabourPayment.prototype, "workOrderLog", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'staff_id' }),
    __metadata("design:type", Number)
], LabourPayment.prototype, "staffId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => staff_member_entity_1.StaffMember),
    (0, typeorm_1.JoinColumn)({ name: 'staff_id' }),
    __metadata("design:type", staff_member_entity_1.StaffMember)
], LabourPayment.prototype, "staff", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'payment_account_id' }),
    __metadata("design:type", Number)
], LabourPayment.prototype, "paymentAccountId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => chart_of_account_entity_1.ChartOfAccount),
    (0, typeorm_1.JoinColumn)({ name: 'payment_account_id' }),
    __metadata("design:type", chart_of_account_entity_1.ChartOfAccount)
], LabourPayment.prototype, "paymentAccount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], LabourPayment.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'payment_date', type: 'date' }),
    __metadata("design:type", String)
], LabourPayment.prototype, "paymentDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], LabourPayment.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], LabourPayment.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], LabourPayment.prototype, "updatedAt", void 0);
exports.LabourPayment = LabourPayment = __decorate([
    (0, typeorm_1.Entity)('labour_payments')
], LabourPayment);
//# sourceMappingURL=labour-payment.entity.js.map