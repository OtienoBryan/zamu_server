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
exports.ExpensePaymentsController = void 0;
const common_1 = require("@nestjs/common");
const expense_payments_service_1 = require("./expense-payments.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const create_expense_payment_dto_1 = require("./dto/create-expense-payment.dto");
let ExpensePaymentsController = class ExpensePaymentsController {
    expensePaymentsService;
    constructor(expensePaymentsService) {
        this.expensePaymentsService = expensePaymentsService;
    }
    async findAll(expenseId) {
        if (expenseId != null && expenseId !== '') {
            const id = Number(expenseId);
            if (Number.isNaN(id)) {
                throw new common_1.BadRequestException('expenseId must be a number');
            }
            return this.expensePaymentsService.findForExpense(id);
        }
        return this.expensePaymentsService.findAll();
    }
    async create(dto, req) {
        return this.expensePaymentsService.create(dto, req.user.sub);
    }
    async remove(id) {
        await this.expensePaymentsService.remove(id);
        return { message: 'Expense payment deleted successfully' };
    }
};
exports.ExpensePaymentsController = ExpensePaymentsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('expenseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExpensePaymentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_expense_payment_dto_1.CreateExpensePaymentDto, Object]),
    __metadata("design:returntype", Promise)
], ExpensePaymentsController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ExpensePaymentsController.prototype, "remove", null);
exports.ExpensePaymentsController = ExpensePaymentsController = __decorate([
    (0, common_1.Controller)('expense-payments'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [expense_payments_service_1.ExpensePaymentsService])
], ExpensePaymentsController);
//# sourceMappingURL=expense-payments.controller.js.map