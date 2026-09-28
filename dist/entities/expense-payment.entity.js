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
exports.ExpensePayment = void 0;
const typeorm_1 = require("typeorm");
const expense_entity_1 = require("./expense.entity");
const chart_of_account_entity_1 = require("./chart-of-account.entity");
let ExpensePayment = class ExpensePayment {
    id;
    expenseId;
    expense;
    paymentAccountId;
    paymentAccount;
    amount;
    paymentDate;
    notes;
    createdBy;
    createdAt;
    updatedAt;
};
exports.ExpensePayment = ExpensePayment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ExpensePayment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'expense_id' }),
    __metadata("design:type", Number)
], ExpensePayment.prototype, "expenseId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => expense_entity_1.Expense),
    (0, typeorm_1.JoinColumn)({ name: 'expense_id' }),
    __metadata("design:type", expense_entity_1.Expense)
], ExpensePayment.prototype, "expense", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'payment_account_id' }),
    __metadata("design:type", Number)
], ExpensePayment.prototype, "paymentAccountId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => chart_of_account_entity_1.ChartOfAccount),
    (0, typeorm_1.JoinColumn)({ name: 'payment_account_id' }),
    __metadata("design:type", chart_of_account_entity_1.ChartOfAccount)
], ExpensePayment.prototype, "paymentAccount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 14, scale: 2 }),
    __metadata("design:type", Number)
], ExpensePayment.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'payment_date', type: 'date' }),
    __metadata("design:type", String)
], ExpensePayment.prototype, "paymentDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], ExpensePayment.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', type: 'int', nullable: true }),
    __metadata("design:type", Object)
], ExpensePayment.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], ExpensePayment.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], ExpensePayment.prototype, "updatedAt", void 0);
exports.ExpensePayment = ExpensePayment = __decorate([
    (0, typeorm_1.Entity)('expense_payments')
], ExpensePayment);
//# sourceMappingURL=expense-payment.entity.js.map