import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('chart_of_accounts')
export class ChartOfAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'account_name', type: 'varchar', length: 100 })
  accountName: string;

  @Column({ name: 'account_code', type: 'varchar', length: 20 })
  accountCode: string;

  // Finer-grained sub-type code — not a direct FK to account_category (values run past 5).
  // account_category is looked up separately via parent_account_id for the top-level Asset/
  // Liability/Equity/Revenue/Expense grouping.
  @Column({ name: 'account_type', type: 'int' })
  accountType: number;

  @Column({ name: 'parent_account_id', type: 'int' })
  parentAccountId: number;

  @Column({ type: 'tinyint' })
  fare: number;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'is_active', type: 'int' })
  isActive: number;
}
