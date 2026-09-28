import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { PartPurchaseOrderItem } from './part-purchase-order-item.entity';

export type POStatus = 'draft' | 'sent' | 'received' | 'cancelled';

@Entity('PartPurchaseOrders')
export class PartPurchaseOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  po_number: string;

  @Column({ type: 'int' })
  vendor_id: number;

  @Column({ type: 'int', nullable: true })
  store_id?: number | null;

  @Column({ type: 'date' })
  order_date: string;

  @Column({ type: 'date', nullable: true })
  expected_delivery_date?: string | null;

  @Column({ type: 'varchar', length: 20, default: 'draft' })
  status: POStatus;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0, transformer: {
    to: (v: number) => v,
    from: (v: string) => v != null ? parseFloat(v) : 0,
  }})
  subtotal: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0, transformer: {
    to: (v: number) => v,
    from: (v: string) => v != null ? parseFloat(v) : 0,
  }})
  total_amount: number;

  @Column({ type: 'text', nullable: true })
  notes?: string | null;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @OneToMany(() => PartPurchaseOrderItem, item => item.purchase_order, { cascade: true, eager: true })
  items: PartPurchaseOrderItem[];
}
