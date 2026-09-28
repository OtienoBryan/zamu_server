"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabourPaymentsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const labour_payments_service_1 = require("./labour-payments.service");
const labour_payments_controller_1 = require("./labour-payments.controller");
const labour_payment_entity_1 = require("../entities/labour-payment.entity");
const work_order_log_entity_1 = require("../entities/work-order-log.entity");
const staff_member_entity_1 = require("../entities/staff-member.entity");
const chart_of_account_entity_1 = require("../entities/chart-of-account.entity");
const journal_entry_entity_1 = require("../entities/journal-entry.entity");
const journal_entry_line_entity_1 = require("../entities/journal-entry-line.entity");
let LabourPaymentsModule = class LabourPaymentsModule {
};
exports.LabourPaymentsModule = LabourPaymentsModule;
exports.LabourPaymentsModule = LabourPaymentsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                labour_payment_entity_1.LabourPayment,
                work_order_log_entity_1.WorkOrderLog,
                staff_member_entity_1.StaffMember,
                chart_of_account_entity_1.ChartOfAccount,
                journal_entry_entity_1.JournalEntry,
                journal_entry_line_entity_1.JournalEntryLine,
            ]),
        ],
        controllers: [labour_payments_controller_1.LabourPaymentsController],
        providers: [labour_payments_service_1.LabourPaymentsService],
        exports: [labour_payments_service_1.LabourPaymentsService],
    })
], LabourPaymentsModule);
//# sourceMappingURL=labour-payments.module.js.map