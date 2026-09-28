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
exports.FinancialReportsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const REVENUE_CATEGORY_ID = 4;
const COGS_ACCOUNT_TYPE = 15;
const OPEX_ACCOUNT_TYPE = 16;
let FinancialReportsService = class FinancialReportsService {
    dataSource;
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async getTrialBalance(startDate, endDate) {
        if (startDate > endDate) {
            throw new common_1.BadRequestException('startDate must not be after endDate');
        }
        const rows = await this.dataSource.query(`SELECT
         coa.id AS accountId,
         coa.account_code AS accountCode,
         coa.account_name AS accountName,
         ac.name AS category,
         COALESCE(SUM(CASE WHEN je.entry_date < ? THEN jel.debit_amount - jel.credit_amount ELSE 0 END), 0) AS openingBalance,
         COALESCE(SUM(CASE WHEN je.entry_date BETWEEN ? AND ? THEN jel.debit_amount ELSE 0 END), 0) AS debit,
         COALESCE(SUM(CASE WHEN je.entry_date BETWEEN ? AND ? THEN jel.credit_amount ELSE 0 END), 0) AS credit
       FROM chart_of_accounts coa
       LEFT JOIN account_category ac ON ac.id = coa.parent_account_id
       LEFT JOIN journal_entry_lines jel ON jel.account_id = coa.id
       LEFT JOIN journal_entries je ON je.id = jel.journal_entry_id AND je.status = 'posted'
       WHERE coa.is_active = 1
       GROUP BY coa.id, coa.account_code, coa.account_name, ac.name
       HAVING ABS(openingBalance) > 0.004 OR ABS(debit) > 0.004 OR ABS(credit) > 0.004
       ORDER BY coa.account_code ASC`, [startDate, startDate, endDate, startDate, endDate]);
        return rows.map((r) => {
            const openingBalance = Number(r.openingBalance);
            const debit = Number(r.debit);
            const credit = Number(r.credit);
            const periodBalance = debit - credit;
            return {
                accountId: r.accountId,
                accountCode: r.accountCode,
                accountName: r.accountName,
                category: r.category,
                openingBalance,
                debit,
                credit,
                periodBalance,
                closingBalance: openingBalance + periodBalance,
            };
        });
    }
    async getProfitAndLoss(startDate, endDate) {
        if (startDate > endDate) {
            throw new common_1.BadRequestException('startDate must not be after endDate');
        }
        const accountRows = await this.dataSource.query(`SELECT
         coa.id AS accountId,
         coa.account_code AS accountCode,
         coa.account_name AS accountName,
         coa.account_type AS accountType,
         coa.parent_account_id AS parentAccountId,
         COALESCE(SUM(jel.debit_amount), 0) AS debit,
         COALESCE(SUM(jel.credit_amount), 0) AS credit
       FROM chart_of_accounts coa
       JOIN journal_entry_lines jel ON jel.account_id = coa.id
       JOIN journal_entries je ON je.id = jel.journal_entry_id
         AND je.status = 'posted' AND je.entry_date BETWEEN ? AND ?
       WHERE coa.parent_account_id = ? OR coa.account_type IN (?, ?)
       GROUP BY coa.id, coa.account_code, coa.account_name, coa.account_type, coa.parent_account_id
       HAVING ABS(SUM(jel.debit_amount) - SUM(jel.credit_amount)) > 0.004
       ORDER BY coa.account_code ASC`, [startDate, endDate, REVENUE_CATEGORY_ID, COGS_ACCOUNT_TYPE, OPEX_ACCOUNT_TYPE]);
        const income = [];
        const costOfGoodsSold = [];
        const operatingExpenses = [];
        for (const r of accountRows) {
            const debit = Number(r.debit);
            const credit = Number(r.credit);
            const line = {
                accountId: r.accountId,
                accountCode: r.accountCode,
                accountName: r.accountName,
                amount: 0,
            };
            if (r.parentAccountId === REVENUE_CATEGORY_ID) {
                line.amount = credit - debit;
                income.push(line);
            }
            else if (r.accountType === COGS_ACCOUNT_TYPE) {
                line.amount = debit - credit;
                costOfGoodsSold.push(line);
            }
            else if (r.accountType === OPEX_ACCOUNT_TYPE) {
                line.amount = debit - credit;
                operatingExpenses.push(line);
            }
        }
        const totalIncome = income.reduce((sum, l) => sum + l.amount, 0);
        const totalCostOfGoodsSold = costOfGoodsSold.reduce((sum, l) => sum + l.amount, 0);
        const grossProfit = totalIncome - totalCostOfGoodsSold;
        const totalOperatingExpenses = operatingExpenses.reduce((sum, l) => sum + l.amount, 0);
        const netProfit = grossProfit - totalOperatingExpenses;
        const [[purchasesRow], [salesRow]] = await Promise.all([
            this.dataSource.query(`SELECT COALESCE(SUM(total_amount), 0) AS total
         FROM raw_material_purchase_orders
         WHERE DATE(ordered_at) BETWEEN ? AND ?`, [startDate, endDate]),
            this.dataSource.query(`SELECT
           COUNT(DISTINCT ps.id) AS salesCount,
           COALESCE(SUM(psi.quantity), 0) AS itemsSold
         FROM pos_sales ps
         LEFT JOIN pos_sale_items psi ON psi.pos_sale_id = ps.id
         WHERE DATE(ps.created_at) BETWEEN ? AND ?`, [startDate, endDate]),
        ]);
        return {
            startDate,
            endDate,
            generatedOn: new Date().toISOString(),
            purchasesInPeriod: Number(purchasesRow.total),
            salesInPeriod: Number(salesRow.salesCount),
            itemsSoldInPeriod: Number(salesRow.itemsSold),
            income,
            totalIncome,
            costOfGoodsSold,
            totalCostOfGoodsSold,
            grossProfit,
            operatingExpenses,
            totalOperatingExpenses,
            netProfit,
        };
    }
    async getAccountsList() {
        const rows = await this.dataSource.query(`SELECT id, account_code AS accountCode, account_name AS accountName
       FROM chart_of_accounts
       WHERE is_active = 1
       ORDER BY account_code ASC`);
        return rows;
    }
    async getJournalEntryLines(query) {
        const conditions = [];
        const params = [];
        if (query.startDate) {
            conditions.push('je.entry_date >= ?');
            params.push(query.startDate);
        }
        if (query.endDate) {
            conditions.push('je.entry_date <= ?');
            params.push(query.endDate);
        }
        if (query.accountId) {
            conditions.push('jel.account_id = ?');
            params.push(query.accountId);
        }
        if (query.reference) {
            conditions.push('je.reference LIKE ?');
            params.push(`%${query.reference}%`);
        }
        if (query.description) {
            conditions.push('jel.description LIKE ?');
            params.push(`%${query.description}%`);
        }
        const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
        const page = query.page ?? 1;
        const pageSize = query.pageSize ?? 15;
        const offset = (page - 1) * pageSize;
        const countRows = await this.dataSource.query(`SELECT COUNT(*) AS total
       FROM journal_entry_lines jel
       JOIN journal_entries je ON je.id = jel.journal_entry_id
       ${where}`, params);
        const total = Number(countRows[0].total);
        const rows = await this.dataSource.query(`SELECT
         jel.id AS lineId,
         je.entry_date AS entryDate,
         je.entry_number AS entryNumber,
         je.reference AS reference,
         je.status AS status,
         coa.account_code AS accountCode,
         coa.account_name AS accountName,
         jel.description AS description,
         jel.debit_amount AS debitAmount,
         jel.credit_amount AS creditAmount
       FROM journal_entry_lines jel
       JOIN journal_entries je ON je.id = jel.journal_entry_id
       LEFT JOIN chart_of_accounts coa ON coa.id = jel.account_id
       ${where}
       ORDER BY je.entry_date DESC, je.id DESC, jel.id ASC
       LIMIT ? OFFSET ?`, [...params, pageSize, offset]);
        return {
            data: rows.map((r) => ({
                lineId: r.lineId,
                entryDate: r.entryDate,
                entryNumber: r.entryNumber,
                reference: r.reference,
                status: r.status,
                accountCode: r.accountCode,
                accountName: r.accountName,
                description: r.description,
                debitAmount: Number(r.debitAmount),
                creditAmount: Number(r.creditAmount),
            })),
            total,
        };
    }
};
exports.FinancialReportsService = FinancialReportsService;
exports.FinancialReportsService = FinancialReportsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], FinancialReportsService);
//# sourceMappingURL=financial-reports.service.js.map