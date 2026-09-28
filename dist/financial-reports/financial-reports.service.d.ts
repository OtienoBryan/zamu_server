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
export declare class FinancialReportsService {
    private dataSource;
    constructor(dataSource: DataSource);
    getTrialBalance(startDate: string, endDate: string): Promise<TrialBalanceRow[]>;
    getProfitAndLoss(startDate: string, endDate: string): Promise<ProfitAndLossReport>;
    getAccountsList(): Promise<AccountOption[]>;
    getJournalEntryLines(query: JournalEntriesQueryDto): Promise<JournalEntryLinesResult>;
}
