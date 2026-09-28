import { JournalEntry } from './journal-entry.entity';
import { ChartOfAccount } from './chart-of-account.entity';
export declare class JournalEntryLine {
    id: number;
    journalEntryId: number;
    journalEntry: JournalEntry;
    accountId: number;
    account: ChartOfAccount;
    debitAmount: number;
    creditAmount: number;
    description: string | null;
}
