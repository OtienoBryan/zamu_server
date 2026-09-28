import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { PosSale } from './pos-sale.entity';
import { ChartOfAccount } from './chart-of-account.entity';

@Entity('pos_sale_payments')
export class PosSalePayment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'pos_sale_id' })
  posSaleId: number;

  @ManyToOne(() => PosSale)
  @JoinColumn({ name: 'pos_sale_id' })
  posSale: PosSale;

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
