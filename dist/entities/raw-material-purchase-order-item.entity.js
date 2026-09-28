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
exports.RawMaterialPurchaseOrderItem = void 0;
const typeorm_1 = require("typeorm");
const raw_material_purchase_order_entity_1 = require("./raw-material-purchase-order.entity");
const raw_material_entity_1 = require("./raw-material.entity");
let RawMaterialPurchaseOrderItem = class RawMaterialPurchaseOrderItem {
    id;
    purchaseOrderId;
    purchaseOrder;
    rawMaterialId;
    rawMaterial;
    quantity;
    receivedQuantity;
    unitCost;
    totalCost;
};
exports.RawMaterialPurchaseOrderItem = RawMaterialPurchaseOrderItem;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RawMaterialPurchaseOrderItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'purchase_order_id' }),
    __metadata("design:type", Number)
], RawMaterialPurchaseOrderItem.prototype, "purchaseOrderId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => raw_material_purchase_order_entity_1.RawMaterialPurchaseOrder, (po) => po.items, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'purchase_order_id' }),
    __metadata("design:type", raw_material_purchase_order_entity_1.RawMaterialPurchaseOrder)
], RawMaterialPurchaseOrderItem.prototype, "purchaseOrder", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'raw_material_id' }),
    __metadata("design:type", Number)
], RawMaterialPurchaseOrderItem.prototype, "rawMaterialId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => raw_material_entity_1.RawMaterial),
    (0, typeorm_1.JoinColumn)({ name: 'raw_material_id' }),
    __metadata("design:type", raw_material_entity_1.RawMaterial)
], RawMaterialPurchaseOrderItem.prototype, "rawMaterial", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], RawMaterialPurchaseOrderItem.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'received_quantity', type: 'decimal', precision: 12, scale: 2, nullable: true }),
    __metadata("design:type", Object)
], RawMaterialPurchaseOrderItem.prototype, "receivedQuantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'unit_cost', type: 'decimal', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], RawMaterialPurchaseOrderItem.prototype, "unitCost", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_cost', type: 'decimal', precision: 14, scale: 2 }),
    __metadata("design:type", Number)
], RawMaterialPurchaseOrderItem.prototype, "totalCost", void 0);
exports.RawMaterialPurchaseOrderItem = RawMaterialPurchaseOrderItem = __decorate([
    (0, typeorm_1.Entity)('raw_material_purchase_order_items')
], RawMaterialPurchaseOrderItem);
//# sourceMappingURL=raw-material-purchase-order-item.entity.js.map