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
exports.RawMaterialPurchaseOrder = void 0;
const typeorm_1 = require("typeorm");
const supplier_entity_1 = require("./supplier.entity");
const raw_material_store_entity_1 = require("./raw-material-store.entity");
const raw_material_purchase_order_item_entity_1 = require("./raw-material-purchase-order-item.entity");
let RawMaterialPurchaseOrder = class RawMaterialPurchaseOrder {
    id;
    supplierId;
    supplier;
    storeId;
    store;
    status;
    subtotal;
    taxRate;
    taxAmount;
    totalAmount;
    orderedAt;
    receivedAt;
    receivedBy;
    createdAt;
    updatedAt;
    items;
};
exports.RawMaterialPurchaseOrder = RawMaterialPurchaseOrder;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RawMaterialPurchaseOrder.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'supplier_id' }),
    __metadata("design:type", Number)
], RawMaterialPurchaseOrder.prototype, "supplierId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => supplier_entity_1.Supplier),
    (0, typeorm_1.JoinColumn)({ name: 'supplier_id' }),
    __metadata("design:type", supplier_entity_1.Supplier)
], RawMaterialPurchaseOrder.prototype, "supplier", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'store_id', nullable: true }),
    __metadata("design:type", Object)
], RawMaterialPurchaseOrder.prototype, "storeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => raw_material_store_entity_1.RawMaterialStore),
    (0, typeorm_1.JoinColumn)({ name: 'store_id' }),
    __metadata("design:type", Object)
], RawMaterialPurchaseOrder.prototype, "store", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['pending', 'received', 'cancelled'], default: 'pending' }),
    __metadata("design:type", String)
], RawMaterialPurchaseOrder.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 14, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], RawMaterialPurchaseOrder.prototype, "subtotal", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tax_rate', type: 'decimal', precision: 5, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], RawMaterialPurchaseOrder.prototype, "taxRate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tax_amount', type: 'decimal', precision: 14, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], RawMaterialPurchaseOrder.prototype, "taxAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_amount', type: 'decimal', precision: 14, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], RawMaterialPurchaseOrder.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'ordered_at' }),
    __metadata("design:type", Date)
], RawMaterialPurchaseOrder.prototype, "orderedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'received_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Object)
], RawMaterialPurchaseOrder.prototype, "receivedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'received_by', type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", Object)
], RawMaterialPurchaseOrder.prototype, "receivedBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], RawMaterialPurchaseOrder.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], RawMaterialPurchaseOrder.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => raw_material_purchase_order_item_entity_1.RawMaterialPurchaseOrderItem, (item) => item.purchaseOrder),
    __metadata("design:type", Array)
], RawMaterialPurchaseOrder.prototype, "items", void 0);
exports.RawMaterialPurchaseOrder = RawMaterialPurchaseOrder = __decorate([
    (0, typeorm_1.Entity)('raw_material_purchase_orders')
], RawMaterialPurchaseOrder);
//# sourceMappingURL=raw-material-purchase-order.entity.js.map