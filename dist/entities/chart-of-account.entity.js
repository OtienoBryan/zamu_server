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
exports.ChartOfAccount = void 0;
const typeorm_1 = require("typeorm");
let ChartOfAccount = class ChartOfAccount {
    id;
    accountName;
    accountCode;
    accountType;
    parentAccountId;
    fare;
    description;
    createdAt;
    updatedAt;
    isActive;
};
exports.ChartOfAccount = ChartOfAccount;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ChartOfAccount.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'account_name', type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], ChartOfAccount.prototype, "accountName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'account_code', type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], ChartOfAccount.prototype, "accountCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'account_type', type: 'int' }),
    __metadata("design:type", Number)
], ChartOfAccount.prototype, "accountType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'parent_account_id', type: 'int' }),
    __metadata("design:type", Number)
], ChartOfAccount.prototype, "parentAccountId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint' }),
    __metadata("design:type", Number)
], ChartOfAccount.prototype, "fare", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], ChartOfAccount.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], ChartOfAccount.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], ChartOfAccount.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', type: 'int' }),
    __metadata("design:type", Number)
], ChartOfAccount.prototype, "isActive", void 0);
exports.ChartOfAccount = ChartOfAccount = __decorate([
    (0, typeorm_1.Entity)('chart_of_accounts')
], ChartOfAccount);
//# sourceMappingURL=chart-of-account.entity.js.map