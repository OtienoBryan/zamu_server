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
exports.FinishedProductInventoryLedger = void 0;
const typeorm_1 = require("typeorm");
const raw_material_store_entity_1 = require("./raw-material-store.entity");
const finished_product_entity_1 = require("./finished-product.entity");
let FinishedProductInventoryLedger = class FinishedProductInventoryLedger {
    id;
    storeId;
    store;
    productId;
    product;
    transactionType;
    quantity;
    previousQuantity;
    newQuantity;
    notes;
    createdBy;
    createdAt;
};
exports.FinishedProductInventoryLedger = FinishedProductInventoryLedger;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], FinishedProductInventoryLedger.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'store_id' }),
    __metadata("design:type", Number)
], FinishedProductInventoryLedger.prototype, "storeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => raw_material_store_entity_1.RawMaterialStore),
    (0, typeorm_1.JoinColumn)({ name: 'store_id' }),
    __metadata("design:type", raw_material_store_entity_1.RawMaterialStore)
], FinishedProductInventoryLedger.prototype, "store", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'product_id' }),
    __metadata("design:type", Number)
], FinishedProductInventoryLedger.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => finished_product_entity_1.FinishedProduct),
    (0, typeorm_1.JoinColumn)({ name: 'product_id' }),
    __metadata("design:type", finished_product_entity_1.FinishedProduct)
], FinishedProductInventoryLedger.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'transaction_type',
        type: 'enum',
        enum: ['production_receipt', 'sale_issue', 'adjustment_in', 'adjustment_out', 'transfer_in', 'transfer_out'],
    }),
    __metadata("design:type", String)
], FinishedProductInventoryLedger.prototype, "transactionType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 14, scale: 2 }),
    __metadata("design:type", Number)
], FinishedProductInventoryLedger.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'previous_quantity', type: 'decimal', precision: 14, scale: 2 }),
    __metadata("design:type", Number)
], FinishedProductInventoryLedger.prototype, "previousQuantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'new_quantity', type: 'decimal', precision: 14, scale: 2 }),
    __metadata("design:type", Number)
], FinishedProductInventoryLedger.prototype, "newQuantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], FinishedProductInventoryLedger.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', type: 'int', nullable: true }),
    __metadata("design:type", Object)
], FinishedProductInventoryLedger.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], FinishedProductInventoryLedger.prototype, "createdAt", void 0);
exports.FinishedProductInventoryLedger = FinishedProductInventoryLedger = __decorate([
    (0, typeorm_1.Entity)('finished_product_inventory_ledger')
], FinishedProductInventoryLedger);
//# sourceMappingURL=finished-product-inventory-ledger.entity.js.map