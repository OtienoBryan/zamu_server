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
exports.WorkOrderStaff = void 0;
const typeorm_1 = require("typeorm");
const work_order_entity_1 = require("./work-order.entity");
const staff_member_entity_1 = require("./staff-member.entity");
let WorkOrderStaff = class WorkOrderStaff {
    id;
    workOrderId;
    workOrder;
    staffMemberId;
    staffMember;
    createdAt;
};
exports.WorkOrderStaff = WorkOrderStaff;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], WorkOrderStaff.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'work_order_id' }),
    __metadata("design:type", Number)
], WorkOrderStaff.prototype, "workOrderId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => work_order_entity_1.WorkOrder, (workOrder) => workOrder.assignedStaff, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'work_order_id' }),
    __metadata("design:type", work_order_entity_1.WorkOrder)
], WorkOrderStaff.prototype, "workOrder", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'staff_member_id' }),
    __metadata("design:type", Number)
], WorkOrderStaff.prototype, "staffMemberId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => staff_member_entity_1.StaffMember),
    (0, typeorm_1.JoinColumn)({ name: 'staff_member_id' }),
    __metadata("design:type", staff_member_entity_1.StaffMember)
], WorkOrderStaff.prototype, "staffMember", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], WorkOrderStaff.prototype, "createdAt", void 0);
exports.WorkOrderStaff = WorkOrderStaff = __decorate([
    (0, typeorm_1.Entity)('work_order_staff')
], WorkOrderStaff);
//# sourceMappingURL=work-order-staff.entity.js.map