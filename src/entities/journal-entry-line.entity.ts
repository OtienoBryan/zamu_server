import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { JournalEntry } from './journal-entry.entity';
import { ChartOfAccount } from './chart-of-account.entity';

@Entity('journal_entry_lines')
export class JournalEntryLine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'journal_entry_id' })
  journalEntryId: number;

  @ManyToOne(() => JournalEntry, (entry) => entry.lines, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'journal_entry_id' })
  journalEntry: JournalEntry;

  @Column({ name: 'account_id' })
  accountId: number;

  @ManyToOne(() => ChartOfAccount)
  @JoinColumn({ name: 'account_id' })
  account: ChartOfAccount;

  @Column({ name: 'debit_amount', type: 'decimal', precision: 15, scale: 2, default: 0 })
  debitAmount: number;

  @Column({ name: 'credit_amount', type: 'decimal', precision: 15, scale: 2, default: 0 })
  creditAmount: number;

  @Column({ type: 'text', nullable: true })
  description: string | null;
}
