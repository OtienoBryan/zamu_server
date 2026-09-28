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
exports.WorkOrderWasteEntry = void 0;
const typeorm_1 = require("typeorm");
const work_order_entity_1 = require("./work-order.entity");
const raw_material_entity_1 = require("./raw-material.entity");
const raw_material_store_entity_1 = require("./raw-material-store.entity");
let WorkOrderWasteEntry = class WorkOrderWasteEntry {
    id;
    workOrderId;
    workOrder;
    rawMaterialId;
    rawMaterial;
    storeId;
    store;
    type;
    reusable;
    quantity;
    stockAction;
    notes;
    createdAt;
};
exports.WorkOrderWasteEntry = WorkOrderWasteEntry;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], WorkOrderWasteEntry.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'work_order_id' }),
    __metadata("design:type", Number)
], WorkOrderWasteEntry.prototype, "workOrderId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => work_order_entity_1.WorkOrder),
    (0, typeorm_1.JoinColumn)({ name: 'work_order_id' }),
    __metadata("design:type", work_order_entity_1.WorkOrder)
], WorkOrderWasteEntry.prototype, "workOrder", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'raw_material_id' }),
    __metadata("design:type", Number)
], WorkOrderWasteEntry.prototype, "rawMaterialId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => raw_material_entity_1.RawMaterial),
    (0, typeorm_1.JoinColumn)({ name: 'raw_material_id' }),
    __metadata("design:type", raw_material_entity_1.RawMaterial)
], WorkOrderWasteEntry.prototype, "rawMaterial", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'store_id' }),
    __metadata("design:type", Number)
], WorkOrderWasteEntry.prototype, "storeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => raw_material_store_entity_1.RawMaterialStore),
    (0, typeorm_1.JoinColumn)({ name: 'store_id' }),
    __metadata("design:type", raw_material_store_entity_1.RawMaterialStore)
], WorkOrderWasteEntry.prototype, "store", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['offcut', 'damage'] }),
    __metadata("design:type", String)
], WorkOrderWasteEntry.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], WorkOrderWasteEntry.prototype, "reusable", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 14, scale: 2 }),
    __metadata("design:type", Number)
], WorkOrderWasteEntry.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'stock_action', type: 'enum', enum: ['returned', 'deducted'] }),
    __metadata("design:type", String)
], WorkOrderWasteEntry.prototype, "stockAction", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", Object)
], WorkOrderWasteEntry.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], WorkOrderWasteEntry.prototype, "createdAt", void 0);
exports.WorkOrderWasteEntry = WorkOrderWasteEntry = __decorate([
    (0, typeorm_1.Entity)('work_order_waste_entries')
], WorkOrderWasteEntry);
//# sourceMappingURL=work-order-waste.entity.js.map