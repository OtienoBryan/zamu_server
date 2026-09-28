import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ChartOfAccount } from './chart-of-account.entity';

@Entity('expenses')
export class Expense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'expense_account_id' })
  expenseAccountId: number;

  @ManyToOne(() => ChartOfAccount)
  @JoinColumn({ name: 'expense_account_id' })
  expenseAccount: ChartOfAccount;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'decimal', precision: 14, scale: 2 })
  amount: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ name: 'created_by', type: 'int', nullable: true })
  createdBy: number | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
