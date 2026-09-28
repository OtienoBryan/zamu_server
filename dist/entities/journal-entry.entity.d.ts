import { JournalEntryLine } from './journal-entry-line.entity';
export type JournalEntryStatus = 'draft' | 'posted' | 'cancelled';
export declare class JournalEntry {
    id: number;
    entryNumber: string;
    entryDate: string;
    reference: string | null;
    description: string | null;
    totalDebit: number;
    totalCredit: number;
    status: JournalEntryStatus;
    createdBy: number;
    createdAt: Date;
    updatedAt: Date;
    lines: JournalEntryLine[];
}
