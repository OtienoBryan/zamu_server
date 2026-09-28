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
exports.PosSalePayment = void 0;
const typeorm_1 = require("typeorm");
const pos_sale_entity_1 = require("./pos-sale.entity");
const chart_of_account_entity_1 = require("./chart-of-account.entity");
let PosSalePayment = class PosSalePayment {
    id;
    posSaleId;
    posSale;
    paymentAccountId;
    paymentAccount;
    amount;
    paymentDate;
    notes;
    createdBy;
    createdAt;
    updatedAt;
};
exports.PosSalePayment = PosSalePayment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PosSalePayment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'pos_sale_id' }),
    __metadata("design:type", Number)
], PosSalePayment.prototype, "posSaleId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => pos_sale_entity_1.PosSale),
    (0, typeorm_1.JoinColumn)({ name: 'pos_sale_id' }),
    __metadata("design:type", pos_sale_entity_1.PosSale)
], PosSalePayment.prototype, "posSale", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'payment_account_id' }),
    __metadata("design:type", Number)
], PosSalePayment.prototype, "paymentAccountId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => chart_of_account_entity_1.ChartOfAccount),
    (0, typeorm_1.JoinColumn)({ name: 'payment_account_id' }),
    __metadata("design:type", chart_of_account_entity_1.ChartOfAccount)
], PosSalePayment.prototype, "paymentAccount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 14, scale: 2 }),
    __metadata("design:type", Number)
], PosSalePayment.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'payment_date', type: 'date' }),
    __metadata("design:type", String)
], PosSalePayment.prototype, "paymentDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], PosSalePayment.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', type: 'int', nullable: true }),
    __metadata("design:type", Object)
], PosSalePayment.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], PosSalePayment.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], PosSalePayment.prototype, "updatedAt", void 0);
exports.PosSalePayment = PosSalePayment = __decorate([
    (0, typeorm_1.Entity)('pos_sale_payments')
], PosSalePayment);
//# sourceMappingURL=pos-sale-payment.entity.js.map