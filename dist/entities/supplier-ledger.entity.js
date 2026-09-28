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
exports.SupplierLedger = void 0;
const typeorm_1 = require("typeorm");
const supplier_entity_1 = require("./supplier.entity");
const raw_material_purchase_order_entity_1 = require("./raw-material-purchase-order.entity");
const chart_of_account_entity_1 = require("./chart-of-account.entity");
let SupplierLedger = class SupplierLedger {
    id;
    supplierId;
    supplier;
    purchaseOrderId;
    purchaseOrder;
    transactionType;
    amount;
    previousBalance;
    newBalance;
    notes;
    paymentAccountId;
    paymentAccount;
    createdBy;
    createdAt;
};
exports.SupplierLedger = SupplierLedger;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SupplierLedger.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'supplier_id' }),
    __metadata("design:type", Number)
], SupplierLedger.prototype, "supplierId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => supplier_entity_1.Supplier),
    (0, typeorm_1.JoinColumn)({ name: 'supplier_id' }),
    __metadata("design:type", supplier_entity_1.Supplier)
], SupplierLedger.prototype, "supplier", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'purchase_order_id', nullable: true }),
    __metadata("design:type", Object)
], SupplierLedger.prototype, "purchaseOrderId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => raw_material_purchase_order_entity_1.RawMaterialPurchaseOrder),
    (0, typeorm_1.JoinColumn)({ name: 'purchase_order_id' }),
    __metadata("design:type", Object)
], SupplierLedger.prototype, "purchaseOrder", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'transaction_type', type: 'enum', enum: ['purchase', 'payment', 'adjustment'], default: 'purchase' }),
    __metadata("design:type", String)
], SupplierLedger.prototype, "transactionType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 14, scale: 2 }),
    __metadata("design:type", Number)
], SupplierLedger.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'previous_balance', type: 'decimal', precision: 14, scale: 2 }),
    __metadata("design:type", Number)
], SupplierLedger.prototype, "previousBalance", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'new_balance', type: 'decimal', precision: 14, scale: 2 }),
    __metadata("design:type", Number)
], SupplierLedger.prototype, "newBalance", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", Object)
], SupplierLedger.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'payment_account_id', nullable: true }),
    __metadata("design:type", Object)
], SupplierLedger.prototype, "paymentAccountId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => chart_of_account_entity_1.ChartOfAccount),
    (0, typeorm_1.JoinColumn)({ name: 'payment_account_id' }),
    __metadata("design:type", Object)
], SupplierLedger.prototype, "paymentAccount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', type: 'int', nullable: true }),
    __metadata("design:type", Object)
], SupplierLedger.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], SupplierLedger.prototype, "createdAt", void 0);
exports.SupplierLedger = SupplierLedger = __decorate([
    (0, typeorm_1.Entity)('supplier_ledger')
], SupplierLedger);
//# sourceMappingURL=supplier-ledger.entity.js.map