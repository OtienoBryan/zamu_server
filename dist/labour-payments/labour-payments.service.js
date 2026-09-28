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
exports.LabourPaymentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const labour_payment_entity_1 = require("../entities/labour-payment.entity");
const work_order_log_entity_1 = require("../entities/work-order-log.entity");
const staff_member_entity_1 = require("../entities/staff-member.entity");
const chart_of_account_entity_1 = require("../entities/chart-of-account.entity");
const journal_entry_entity_1 = require("../entities/journal-entry.entity");
const journal_entry_line_entity_1 = require("../entities/journal-entry-line.entity");
const RELATIONS = ['staff', 'paymentAccount'];
const LABOUR_EXPENSE_ACCOUNT_NAME = 'Direct labour - COS';
let LabourPaymentsService = class LabourPaymentsService {
    labourPaymentRepository;
    dataSource;
    constructor(labourPaymentRepository, dataSource) {
        this.labourPaymentRepository = labourPaymentRepository;
        this.dataSource = dataSource;
    }
    async findAll() {
        return this.labourPaymentRepository.find({
            relations: RELATIONS,
            order: { paymentDate: 'DESC' },
        });
    }
    async create(dto, createdBy) {
        const savedPaymentId = await this.dataSource.transaction(async (manager) => {
            const log = await manager.findOne(work_order_log_entity_1.WorkOrderLog, { where: { id: dto.workOrderLogId } });
            if (!log) {
                throw new common_1.NotFoundException(`Work order log with ID ${dto.workOrderLogId} not found`);
            }
            const staff = await manager.findOne(staff_member_entity_1.StaffMember, { where: { id: dto.staffId } });
            if (!staff) {
                throw new common_1.NotFoundException(`Staff member with ID ${dto.staffId} not found`);
            }
            const paymentAccount = await manager.findOne(chart_of_account_entity_1.ChartOfAccount, { where: { id: dto.paymentAccountId } });
            if (!paymentAccount) {
                throw new common_1.NotFoundException(`Payment account with ID ${dto.paymentAccountId} not found`);
            }
            const labourExpenseAccount = await manager.findOne(chart_of_account_entity_1.ChartOfAccount, {
                where: { accountName: LABOUR_EXPENSE_ACCOUNT_NAME },
            });
            if (!labourExpenseAccount) {
                throw new common_1.NotFoundException(`Chart of accounts is missing "${LABOUR_EXPENSE_ACCOUNT_NAME}"`);
            }
            const payment = manager.create(labour_payment_entity_1.LabourPayment, {
                workOrderLogId: dto.workOrderLogId,
                staffId: dto.staffId,
                paymentAccountId: dto.paymentAccountId,
                amount: dto.amount,
                paymentDate: dto.paymentDate,
                notes: dto.notes ?? null,
            });
            const savedPayment = await manager.save(labour_payment_entity_1.LabourPayment, payment);
            const amount = Number(dto.amount);
            const journalEntry = manager.create(journal_entry_entity_1.JournalEntry, {
                entryNumber: `JE-LP-${savedPayment.id}`,
                entryDate: dto.paymentDate,
                reference: `LP-${savedPayment.id}`,
                description: `Labour payment to ${staff.name}`,
                totalDebit: amount,
                totalCredit: amount,
                status: 'posted',
                createdBy,
            });
            const savedJournalEntry = await manager.save(journal_entry_entity_1.JournalEntry, journalEntry);
            await manager.save(journal_entry_line_entity_1.JournalEntryLine, [
                manager.create(journal_entry_line_entity_1.JournalEntryLine, {
                    journalEntryId: savedJournalEntry.id,
                    accountId: labourExpenseAccount.id,
                    debitAmount: amount,
                    creditAmount: 0,
                    description: `Direct labour - ${staff.name} - LP-${savedPayment.id}`,
                }),
                manager.create(journal_entry_line_entity_1.JournalEntryLine, {
                    journalEntryId: savedJournalEntry.id,
                    accountId: paymentAccount.id,
                    debitAmount: 0,
                    creditAmount: amount,
                    description: `Payment to ${staff.name} - LP-${savedPayment.id}`,
                }),
            ]);
            return savedPayment.id;
        });
        return this.labourPaymentRepository.findOne({ where: { id: savedPaymentId }, relations: RELATIONS });
    }
    async remove(id) {
        const payment = await this.labourPaymentRepository.findOne({ where: { id } });
        if (!payment) {
            throw new common_1.NotFoundException(`Labour payment with ID ${id} not found`);
        }
        await this.labourPaymentRepository.remove(payment);
    }
};
exports.LabourPaymentsService = LabourPaymentsService;
exports.LabourPaymentsService = LabourPaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(labour_payment_entity_1.LabourPayment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource])
], LabourPaymentsService);
//# sourceMappingURL=labour-payments.service.js.map