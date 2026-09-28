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
exports.RawMaterialInventoryLedger = void 0;
const typeorm_1 = require("typeorm");
const raw_material_store_entity_1 = require("./raw-material-store.entity");
const raw_material_entity_1 = require("./raw-material.entity");
const raw_material_purchase_order_entity_1 = require("./raw-material-purchase-order.entity");
let RawMaterialInventoryLedger = class RawMaterialInventoryLedger {
    id;
    storeId;
    store;
    rawMaterialId;
    rawMaterial;
    purchaseOrderId;
    purchaseOrder;
    transactionType;
    quantity;
    previousQuantity;
    newQuantity;
    notes;
    createdAt;
};
exports.RawMaterialInventoryLedger = RawMaterialInventoryLedger;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RawMaterialInventoryLedger.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'store_id' }),
    __metadata("design:type", Number)
], RawMaterialInventoryLedger.prototype, "storeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => raw_material_store_entity_1.RawMaterialStore),
    (0, typeorm_1.JoinColumn)({ name: 'store_id' }),
    __metadata("design:type", raw_material_store_entity_1.RawMaterialStore)
], RawMaterialInventoryLedger.prototype, "store", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'raw_material_id' }),
    __metadata("design:type", Number)
], RawMaterialInventoryLedger.prototype, "rawMaterialId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => raw_material_entity_1.RawMaterial),
    (0, typeorm_1.JoinColumn)({ name: 'raw_material_id' }),
    __metadata("design:type", raw_material_entity_1.RawMaterial)
], RawMaterialInventoryLedger.prototype, "rawMaterial", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'purchase_order_id', nullable: true }),
    __metadata("design:type", Object)
], RawMaterialInventoryLedger.prototype, "purchaseOrderId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => raw_material_purchase_order_entity_1.RawMaterialPurchaseOrder),
    (0, typeorm_1.JoinColumn)({ name: 'purchase_order_id' }),
    __metadata("design:type", Object)
], RawMaterialInventoryLedger.prototype, "purchaseOrder", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'transaction_type', type: 'enum', enum: ['purchase_receipt', 'adjustment', 'production_use'], default: 'purchase_receipt' }),
    __metadata("design:type", String)
], RawMaterialInventoryLedger.prototype, "transactionType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 14, scale: 2 }),
    __metadata("design:type", Number)
], RawMaterialInventoryLedger.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'previous_quantity', type: 'decimal', precision: 14, scale: 2 }),
    __metadata("design:type", Number)
], RawMaterialInventoryLedger.prototype, "previousQuantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'new_quantity', type: 'decimal', precision: 14, scale: 2 }),
    __metadata("design:type", Number)
], RawMaterialInventoryLedger.prototype, "newQuantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", Object)
], RawMaterialInventoryLedger.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], RawMaterialInventoryLedger.prototype, "createdAt", void 0);
exports.RawMaterialInventoryLedger = RawMaterialInventoryLedger = __decorate([
    (0, typeorm_1.Entity)('raw_material_inventory_ledger')
], RawMaterialInventoryLedger);
//# sourceMappingURL=raw-material-inventory-ledger.entity.js.map