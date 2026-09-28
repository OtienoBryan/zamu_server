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
exports.FinancialReportsController = void 0;
const common_1 = require("@nestjs/common");
const financial_reports_service_1 = require("./financial-reports.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const trial_balance_query_dto_1 = require("./dto/trial-balance-query.dto");
const journal_entries_query_dto_1 = require("./dto/journal-entries-query.dto");
let FinancialReportsController = class FinancialReportsController {
    financialReportsService;
    constructor(financialReportsService) {
        this.financialReportsService = financialReportsService;
    }
    async getTrialBalance(query) {
        return this.financialReportsService.getTrialBalance(query.startDate, query.endDate);
    }
    async getProfitAndLoss(query) {
        return this.financialReportsService.getProfitAndLoss(query.startDate, query.endDate);
    }
    async getAccounts() {
        return this.financialReportsService.getAccountsList();
    }
    async getJournalEntries(query) {
        return this.financialReportsService.getJournalEntryLines(query);
    }
};
exports.FinancialReportsController = FinancialReportsController;
__decorate([
    (0, common_1.Get)('trial-balance'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [trial_balance_query_dto_1.TrialBalanceQueryDto]),
    __metadata("design:returntype", Promise)
], FinancialReportsController.prototype, "getTrialBalance", null);
__decorate([
    (0, common_1.Get)('profit-and-loss'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [trial_balance_query_dto_1.TrialBalanceQueryDto]),
    __metadata("design:returntype", Promise)
], FinancialReportsController.prototype, "getProfitAndLoss", null);
__decorate([
    (0, common_1.Get)('accounts'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FinancialReportsController.prototype, "getAccounts", null);
__decorate([
    (0, common_1.Get)('journal-entries'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [journal_entries_query_dto_1.JournalEntriesQueryDto]),
    __metadata("design:returntype", Promise)
], FinancialReportsController.prototype, "getJournalEntries", null);
exports.FinancialReportsController = FinancialReportsController = __decorate([
    (0, common_1.Controller)('financial-reports'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [financial_reports_service_1.FinancialReportsService])
], FinancialReportsController);
//# sourceMappingURL=financial-reports.controller.js.map