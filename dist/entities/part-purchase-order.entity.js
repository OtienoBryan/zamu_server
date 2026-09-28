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
exports.PartPurchaseOrder = void 0;
const typeorm_1 = require("typeorm");
const part_purchase_order_item_entity_1 = require("./part-purchase-order-item.entity");
let PartPurchaseOrder = class PartPurchaseOrder {
    id;
    po_number;
    vendor_id;
    store_id;
    order_date;
    expected_delivery_date;
    status;
    subtotal;
    total_amount;
    notes;
    created_at;
    updated_at;
    items;
};
exports.PartPurchaseOrder = PartPurchaseOrder;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PartPurchaseOrder.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, unique: true }),
    __metadata("design:type", String)
], PartPurchaseOrder.prototype, "po_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], PartPurchaseOrder.prototype, "vendor_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Object)
], PartPurchaseOrder.prototype, "store_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", String)
], PartPurchaseOrder.prototype, "order_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Object)
], PartPurchaseOrder.prototype, "expected_delivery_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, default: 'draft' }),
    __metadata("design:type", String)
], PartPurchaseOrder.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2, default: 0, transformer: {
            to: (v) => v,
            from: (v) => v != null ? parseFloat(v) : 0,
        } }),
    __metadata("design:type", Number)
], PartPurchaseOrder.prototype, "subtotal", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2, default: 0, transformer: {
            to: (v) => v,
            from: (v) => v != null ? parseFloat(v) : 0,
        } }),
    __metadata("design:type", Number)
], PartPurchaseOrder.prototype, "total_amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], PartPurchaseOrder.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], PartPurchaseOrder.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], PartPurchaseOrder.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => part_purchase_order_item_entity_1.PartPurchaseOrderItem, item => item.purchase_order, { cascade: true, eager: true }),
    __metadata("design:type", Array)
], PartPurchaseOrder.prototype, "items", void 0);
exports.PartPurchaseOrder = PartPurchaseOrder = __decorate([
    (0, typeorm_1.Entity)('PartPurchaseOrders')
], PartPurchaseOrder);
//# sourceMappingURL=part-purchase-order.entity.js.map