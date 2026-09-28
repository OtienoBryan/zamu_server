import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Supplier } from './supplier.entity';
import { RawMaterialPurchaseOrder } from './raw-material-purchase-order.entity';
import { ChartOfAccount } from './chart-of-account.entity';

export type SupplierLedgerTransactionType = 'purchase' | 'payment' | 'adjustment';

@Entity('supplier_ledger')
export class SupplierLedger {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'supplier_id' })
  supplierId: number;

  @ManyToOne(() => Supplier)
  @JoinColumn({ name: 'supplier_id' })
  supplier: Supplier;

  @Column({ name: 'purchase_order_id', nullable: true })
  purchaseOrderId: number | null;

  @ManyToOne(() => RawMaterialPurchaseOrder)
  @JoinColumn({ name: 'purchase_order_id' })
  purchaseOrder: RawMaterialPurchaseOrder | null;

  @Column({ name: 'transaction_type', type: 'enum', enum: ['purchase', 'payment', 'adjustment'], default: 'purchase' })
  transactionType: SupplierLedgerTransactionType;

  @Column({ type: 'decimal', precision: 14, scale: 2 })
  amount: number;

  @Column({ name: 'previous_balance', type: 'decimal', precision: 14, scale: 2 })
  previousBalance: number;

  @Column({ name: 'new_balance', type: 'decimal', precision: 14, scale: 2 })
  newBalance: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  notes: string | null;

  @Column({ name: 'payment_account_id', nullable: true })
  paymentAccountId: number | null;

  @ManyToOne(() => ChartOfAccount)
  @JoinColumn({ name: 'payment_account_id' })
  paymentAccount: ChartOfAccount | null;

  @Column({ name: 'created_by', type: 'int', nullable: true })
  createdBy: number | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
