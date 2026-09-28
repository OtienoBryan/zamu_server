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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChartOfAccountsController = void 0;
const common_1 = require("@nestjs/common");
const chart_of_accounts_service_1 = require("./chart-of-accounts.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const create_chart_of_account_dto_1 = require("./dto/create-chart-of-account.dto");
const update_chart_of_account_dto_1 = require("./dto/update-chart-of-account.dto");
let ChartOfAccountsController = class ChartOfAccountsController {
    chartOfAccountsService;
    constructor(chartOfAccountsService) {
        this.chartOfAccountsService = chartOfAccountsService;
    }
    async findAll() {
        return this.chartOfAccountsService.findAll();
    }
    async findCategories() {
        return this.chartOfAccountsService.findCategories();
    }
    async findPaymentMethods() {
        return this.chartOfAccountsService.findPaymentMethods();
    }
    async findExpenseAccounts() {
        return this.chartOfAccountsService.findExpenseAccounts();
    }
    async create(dto) {
        return this.chartOfAccountsService.create(dto);
    }
    async update(id, dto) {
        return this.chartOfAccountsService.update(id, dto);
    }
    async remove(id) {
        await this.chartOfAccountsService.remove(id);
        return { message: 'Chart of account deleted successfully' };
    }
};
exports.ChartOfAccountsController = ChartOfAccountsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChartOfAccountsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('categories'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChartOfAccountsController.prototype, "findCategories", null);
__decorate([
    (0, common_1.Get)('payment-methods'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChartOfAccountsController.prototype, "findPaymentMethods", null);
__decorate([
    (0, common_1.Get)('expense-accounts'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChartOfAccountsController.prototype, "findExpenseAccounts", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_chart_of_account_dto_1.CreateChartOfAccountDto]),
    __metadata("design:returntype", Promise)
], ChartOfAccountsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_chart_of_account_dto_1.UpdateChartOfAccountDto]),
    __metadata("design:returntype", Promise)
], ChartOfAccountsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ChartOfAccountsController.prototype, "remove", null);
exports.ChartOfAccountsController = ChartOfAccountsController = __decorate([
    (0, common_1.Controller)('chart-of-accounts'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [chart_of_accounts_service_1.ChartOfAccountsService])
], ChartOfAccountsController);
//# sourceMappingURL=chart-of-accounts.controller.js.map