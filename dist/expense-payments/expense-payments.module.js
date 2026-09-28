"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpensePaymentsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const expense_payments_service_1 = require("./expense-payments.service");
const expense_payments_controller_1 = require("./expense-payments.controller");
const expense_payment_entity_1 = require("../entities/expense-payment.entity");
const expense_entity_1 = require("../entities/expense.entity");
const chart_of_account_entity_1 = require("../entities/chart-of-account.entity");
const journal_entry_entity_1 = require("../entities/journal-entry.entity");
const journal_entry_line_entity_1 = require("../entities/journal-entry-line.entity");
let ExpensePaymentsModule = class ExpensePaymentsModule {
};
exports.ExpensePaymentsModule = ExpensePaymentsModule;
exports.ExpensePaymentsModule = ExpensePaymentsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([expense_payment_entity_1.ExpensePayment, expense_entity_1.Expense, chart_of_account_entity_1.ChartOfAccount, journal_entry_entity_1.JournalEntry, journal_entry_line_entity_1.JournalEntryLine]),
        ],
        controllers: [expense_payments_controller_1.ExpensePaymentsController],
        providers: [expense_payments_service_1.ExpensePaymentsService],
        exports: [expense_payments_service_1.ExpensePaymentsService],
    })
], ExpensePaymentsModule);
//# sourceMappingURL=expense-payments.module.js.map