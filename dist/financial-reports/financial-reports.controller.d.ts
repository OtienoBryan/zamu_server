import { FinancialReportsService, TrialBalanceRow, JournalEntryLinesResult, AccountOption, ProfitAndLossReport } from './financial-reports.service';
import { TrialBalanceQueryDto } from './dto/trial-balance-query.dto';
import { JournalEntriesQueryDto } from './dto/journal-entries-query.dto';
export declare class FinancialReportsController {
    private readonly financialReportsService;
    constructor(financialReportsService: FinancialReportsService);
    getTrialBalance(query: TrialBalanceQueryDto): Promise<TrialBalanceRow[]>;
    getProfitAndLoss(query: TrialBalanceQueryDto): Promise<ProfitAndLossReport>;
    getAccounts(): Promise<AccountOption[]>;
    getJournalEntries(query: JournalEntriesQueryDto): Promise<JournalEntryLinesResult>;
}
