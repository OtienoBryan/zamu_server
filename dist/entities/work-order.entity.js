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
exports.WorkOrder = void 0;
const typeorm_1 = require("typeorm");
const finished_product_entity_1 = require("./finished-product.entity");
const production_stage_entity_1 = require("./production-stage.entity");
const staff_member_entity_1 = require("./staff-member.entity");
const work_order_staff_entity_1 = require("./work-order-staff.entity");
const work_order_material_entity_1 = require("./work-order-material.entity");
let WorkOrder = class WorkOrder {
    id;
    description;
    productId;
    product;
    stageId;
    stage;
    staffId;
    staff;
    date;
    targetQuantity;
    status;
    createdAt;
    updatedAt;
    assignedStaff;
    materials;
};
exports.WorkOrder = WorkOrder;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], WorkOrder.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], WorkOrder.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'product_id' }),
    __metadata("design:type", Number)
], WorkOrder.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => finished_product_entity_1.FinishedProduct),
    (0, typeorm_1.JoinColumn)({ name: 'product_id' }),
    __metadata("design:type", finished_product_entity_1.FinishedProduct)
], WorkOrder.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'stage_id' }),
    __metadata("design:type", Number)
], WorkOrder.prototype, "stageId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => production_stage_entity_1.ProductionStage),
    (0, typeorm_1.JoinColumn)({ name: 'stage_id' }),
    __metadata("design:type", production_stage_entity_1.ProductionStage)
], WorkOrder.prototype, "stage", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'staff_id' }),
    __metadata("design:type", Number)
], WorkOrder.prototype, "staffId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => staff_member_entity_1.StaffMember),
    (0, typeorm_1.JoinColumn)({ name: 'staff_id' }),
    __metadata("design:type", staff_member_entity_1.StaffMember)
], WorkOrder.prototype, "staff", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", String)
], WorkOrder.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'target_quantity', type: 'decimal', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], WorkOrder.prototype, "targetQuantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['pending', 'in_progress', 'completed', 'cancelled'], default: 'pending' }),
    __metadata("design:type", String)
], WorkOrder.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], WorkOrder.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], WorkOrder.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => work_order_staff_entity_1.WorkOrderStaff, (assigned) => assigned.workOrder),
    __metadata("design:type", Array)
], WorkOrder.prototype, "assignedStaff", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => work_order_material_entity_1.WorkOrderMaterial, (material) => material.workOrder),
    __metadata("design:type", Array)
], WorkOrder.prototype, "materials", void 0);
exports.WorkOrder = WorkOrder = __decorate([
    (0, typeorm_1.Entity)('work_orders')
], WorkOrder);
//# sourceMappingURL=work-order.entity.js.map