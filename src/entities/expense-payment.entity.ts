import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Expense } from './expense.entity';
import { ChartOfAccount } from './chart-of-account.entity';

@Entity('expense_payments')
export class ExpensePayment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'expense_id' })
  expenseId: number;

  @ManyToOne(() => Expense)
  @JoinColumn({ name: 'expense_id' })
  expense: Expense;

  @Column({ name: 'payment_account_id' })
  paymentAccountId: number;

  @ManyToOne(() => ChartOfAccount)
  @JoinColumn({ name: 'payment_account_id' })
  paymentAccount: ChartOfAccount;

  @Column({ type: 'decimal', precision: 14, scale: 2 })
  amount: number;

  @Column({ name: 'payment_date', type: 'date' })
  paymentDate: string;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @Column({ name: 'created_by', type: 'int', nullable: true })
  createdBy: number | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
