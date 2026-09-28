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
exports.WorkOrderMaterial = void 0;
const typeorm_1 = require("typeorm");
const work_order_entity_1 = require("./work-order.entity");
const raw_material_entity_1 = require("./raw-material.entity");
let WorkOrderMaterial = class WorkOrderMaterial {
    id;
    workOrderId;
    workOrder;
    rawMaterialId;
    rawMaterial;
    quantity;
    createdAt;
};
exports.WorkOrderMaterial = WorkOrderMaterial;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], WorkOrderMaterial.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'work_order_id' }),
    __metadata("design:type", Number)
], WorkOrderMaterial.prototype, "workOrderId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => work_order_entity_1.WorkOrder, (workOrder) => workOrder.materials, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'work_order_id' }),
    __metadata("design:type", work_order_entity_1.WorkOrder)
], WorkOrderMaterial.prototype, "workOrder", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'raw_material_id' }),
    __metadata("design:type", Number)
], WorkOrderMaterial.prototype, "rawMaterialId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => raw_material_entity_1.RawMaterial),
    (0, typeorm_1.JoinColumn)({ name: 'raw_material_id' }),
    __metadata("design:type", raw_material_entity_1.RawMaterial)
], WorkOrderMaterial.prototype, "rawMaterial", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], WorkOrderMaterial.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], WorkOrderMaterial.prototype, "createdAt", void 0);
exports.WorkOrderMaterial = WorkOrderMaterial = __decorate([
    (0, typeorm_1.Entity)('work_order_materials')
], WorkOrderMaterial);
//# sourceMappingURL=work-order-material.entity.js.map