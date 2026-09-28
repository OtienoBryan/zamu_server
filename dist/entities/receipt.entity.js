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
exports.Receipt = void 0;
const typeorm_1 = require("typeorm");
const pos_sale_payment_entity_1 = require("./pos-sale-payment.entity");
const pos_sale_entity_1 = require("./pos-sale.entity");
const client_record_entity_1 = require("./client-record.entity");
let Receipt = class Receipt {
    id;
    receiptNumber;
    posSalePaymentId;
    payment;
    posSaleId;
    sale;
    clientId;
    client;
    amount;
    paymentDate;
    paymentMethod;
    notes;
    createdBy;
    createdAt;
};
exports.Receipt = Receipt;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Receipt.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'receipt_number', type: 'varchar', length: 50, unique: true }),
    __metadata("design:type", String)
], Receipt.prototype, "receiptNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'pos_sale_payment_id' }),
    __metadata("design:type", Number)
], Receipt.prototype, "posSalePaymentId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => pos_sale_payment_entity_1.PosSalePayment),
    (0, typeorm_1.JoinColumn)({ name: 'pos_sale_payment_id' }),
    __metadata("design:type", pos_sale_payment_entity_1.PosSalePayment)
], Receipt.prototype, "payment", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'pos_sale_id' }),
    __metadata("design:type", Number)
], Receipt.prototype, "posSaleId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => pos_sale_entity_1.PosSale),
    (0, typeorm_1.JoinColumn)({ name: 'pos_sale_id' }),
    __metadata("design:type", pos_sale_entity_1.PosSale)
], Receipt.prototype, "sale", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'client_id', nullable: true }),
    __metadata("design:type", Object)
], Receipt.prototype, "clientId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => client_record_entity_1.ClientRecord),
    (0, typeorm_1.JoinColumn)({ name: 'client_id' }),
    __metadata("design:type", Object)
], Receipt.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 14, scale: 2 }),
    __metadata("design:type", Number)
], Receipt.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'payment_date', type: 'date' }),
    __metadata("design:type", String)
], Receipt.prototype, "paymentDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'payment_method', type: 'varchar', length: 150 }),
    __metadata("design:type", String)
], Receipt.prototype, "paymentMethod", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Receipt.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', type: 'int', nullable: true }),
    __metadata("design:type", Object)
], Receipt.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Receipt.prototype, "createdAt", void 0);
exports.Receipt = Receipt = __decorate([
    (0, typeorm_1.Entity)('receipts')
], Receipt);
//# sourceMappingURL=receipt.entity.js.map