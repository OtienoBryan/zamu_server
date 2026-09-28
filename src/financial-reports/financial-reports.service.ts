import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { JournalEntriesQueryDto } from './dto/journal-entries-query.dto';

export interface TrialBalanceRow {
  accountId: number;
  accountCode: string;
  accountName: string;
  category: string | null;
  openingBalance: number;
  debit: number;
  credit: number;
  periodBalance: number;
  closingBalance: number;
}

export interface JournalEntryLineRow {
  lineId: number;
  entryDate: string;
  entryNumber: string;
  reference: string | null;
  status: 'draft' | 'posted' | 'cancelled';
  accountCode: string | null;
  accountName: string | null;
  description: string | null;
  debitAmount: number;
  creditAmount: number;
}

export interface JournalEntryLinesResult {
  data: JournalEntryLineRow[];
  total: number;
}

export interface AccountOption {
  id: number;
  accountCode: string;
  accountName: string;
}

export interface ProfitAndLossLine {
  accountId: number;
  accountCode: string;
  accountName: string;
  amount: number;
}

export interface ProfitAndLossReport {
  startDate: string;
  endDate: string;
  generatedOn: string;
  purchasesInPeriod: number;
  salesInPeriod: number;
  itemsSoldInPeriod: number;
  income: ProfitAndLossLine[];
  totalIncome: number;
  costOfGoodsSold: ProfitAndLossLine[];
  totalCostOfGoodsSold: number;
  grossProfit: number;
  operatingExpenses: ProfitAndLossLine[];
  totalOperatingExpenses: number;
  netProfit: number;
}

// account_type 15 = cost-of-sales accounts, 16 = operating-expense accounts —
// the only two sub-types that map cleanly onto a P&L's COGS/Opex sections.
// Revenue is identified by parent_account_id (the account_category grouping),
// same as the trial balance above.
const REVENUE_CATEGORY_ID = 4;
const COGS_ACCOUNT_TYPE = 15;
const OPEX_ACCOUNT_TYPE = 16;

@Injectable()
export class FinancialReportsService {
  constructor(private dataSource: DataSource) {}

  async getTrialBalance(startDate: string, endDate: string): Promise<TrialBalanceRow[]> {
    if (startDate > endDate) {
      throw new BadRequestException('startDate must not be after endDate');
    }

    // Opening balance = net movement on posted entries strictly before the period;
    // debit/credit = movement on posted entries within [startDate, endDate].
    // account_category is joined via chart_of_accounts.parent_account_id, the only
    // column whose values (1–5) actually line up with account_category.id — the
    // separate "account_type" column is a finer code with no backing lookup table.
    const rows = await this.dataSource.query(
      `SELECT
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
       ORDER BY coa.account_code ASC`,
      [startDate, startDate, endDate, startDate, endDate],
    );

    return rows.map((r: any) => {
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

  async getProfitAndLoss(startDate: string, endDate: string): Promise<ProfitAndLossReport> {
    if (startDate > endDate) {
      throw new BadRequestException('startDate must not be after endDate');
    }

    const accountRows = await this.dataSource.query(
      `SELECT
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
       ORDER BY coa.account_code ASC`,
      [startDate, endDate, REVENUE_CATEGORY_ID, COGS_ACCOUNT_TYPE, OPEX_ACCOUNT_TYPE],
    );

    const income: ProfitAndLossLine[] = [];
    const costOfGoodsSold: ProfitAndLossLine[] = [];
    const operatingExpenses: ProfitAndLossLine[] = [];

    for (const r of accountRows) {
      const debit = Number(r.debit);
      const credit = Number(r.credit);
      const line: ProfitAndLossLine = {
        accountId: r.accountId,
        accountCode: r.accountCode,
        accountName: r.accountName,
        amount: 0,
      };
      if (r.parentAccountId === REVENUE_CATEGORY_ID) {
        line.amount = credit - debit;
        income.push(line);
      } else if (r.accountType === COGS_ACCOUNT_TYPE) {
        line.amount = debit - credit;
        costOfGoodsSold.push(line);
      } else if (r.accountType === OPEX_ACCOUNT_TYPE) {
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
      this.dataSource.query(
        `SELECT COALESCE(SUM(total_amount), 0) AS total
         FROM raw_material_purchase_orders
         WHERE DATE(ordered_at) BETWEEN ? AND ?`,
        [startDate, endDate],
      ),
      this.dataSource.query(
        `SELECT
           COUNT(DISTINCT ps.id) AS salesCount,
           COALESCE(SUM(psi.quantity), 0) AS itemsSold
         FROM pos_sales ps
         LEFT JOIN pos_sale_items psi ON psi.pos_sale_id = ps.id
         WHERE DATE(ps.created_at) BETWEEN ? AND ?`,
        [startDate, endDate],
      ),
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

  async getAccountsList(): Promise<AccountOption[]> {
    const rows = await this.dataSource.query(
      `SELECT id, account_code AS accountCode, account_name AS accountName
       FROM chart_of_accounts
       WHERE is_active = 1
       ORDER BY account_code ASC`,
    );
    return rows;
  }

  async getJournalEntryLines(query: JournalEntriesQueryDto): Promise<JournalEntryLinesResult> {
    const conditions: string[] = [];
    const params: any[] = [];

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

    const countRows = await this.dataSource.query(
      `SELECT COUNT(*) AS total
       FROM journal_entry_lines jel
       JOIN journal_entries je ON je.id = jel.journal_entry_id
       ${where}`,
      params,
    );
    const total = Number(countRows[0].total);

    const rows = await this.dataSource.query(
      `SELECT
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
       LIMIT ? OFFSET ?`,
      [...params, pageSize, offset],
    );

    return {
      data: rows.map((r: any) => ({
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
}
