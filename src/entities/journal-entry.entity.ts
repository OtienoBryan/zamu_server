import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { JournalEntryLine } from './journal-entry-line.entity';

export type JournalEntryStatus = 'draft' | 'posted' | 'cancelled';

@Entity('journal_entries')
export class JournalEntry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'entry_number', type: 'varchar', length: 20, unique: true })
  entryNumber: string;

  @Column({ name: 'entry_date', type: 'date' })
  entryDate: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  reference: string | null;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ name: 'total_debit', type: 'decimal', precision: 15, scale: 2, default: 0 })
  totalDebit: number;

  @Column({ name: 'total_credit', type: 'decimal', precision: 15, scale: 2, default: 0 })
  totalCredit: number;

  @Column({ type: 'enum', enum: ['draft', 'posted', 'cancelled'], default: 'draft' })
  status: JournalEntryStatus;

  @Column({ name: 'created_by' })
  createdBy: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => JournalEntryLine, (line) => line.journalEntry)
  lines: JournalEntryLine[];
}
