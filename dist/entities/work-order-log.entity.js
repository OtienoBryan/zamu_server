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
exports.WorkOrderLog = void 0;
const typeorm_1 = require("typeorm");
const work_order_entity_1 = require("./work-order.entity");
let WorkOrderLog = class WorkOrderLog {
    id;
    workOrderId;
    workOrder;
    startTime;
    endTime;
    quantityDone;
    createdAt;
    updatedAt;
};
exports.WorkOrderLog = WorkOrderLog;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], WorkOrderLog.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'work_order_id' }),
    __metadata("design:type", Number)
], WorkOrderLog.prototype, "workOrderId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => work_order_entity_1.WorkOrder),
    (0, typeorm_1.JoinColumn)({ name: 'work_order_id' }),
    __metadata("design:type", work_order_entity_1.WorkOrder)
], WorkOrderLog.prototype, "workOrder", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'start_time', type: 'datetime' }),
    __metadata("design:type", Date)
], WorkOrderLog.prototype, "startTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'end_time', type: 'datetime' }),
    __metadata("design:type", Date)
], WorkOrderLog.prototype, "endTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'quantity_done', type: 'decimal', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], WorkOrderLog.prototype, "quantityDone", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], WorkOrderLog.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], WorkOrderLog.prototype, "updatedAt", void 0);
exports.WorkOrderLog = WorkOrderLog = __decorate([
    (0, typeorm_1.Entity)('work_order_logs')
], WorkOrderLog);
//# sourceMappingURL=work-order-log.entity.js.map