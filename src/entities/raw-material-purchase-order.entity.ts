import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Supplier } from './supplier.entity';
import { RawMaterialStore } from './raw-material-store.entity';
import { RawMaterialPurchaseOrderItem } from './raw-material-purchase-order-item.entity';

export type PurchaseOrderStatus = 'pending' | 'received' | 'cancelled';

@Entity('raw_material_purchase_orders')
export class RawMaterialPurchaseOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'supplier_id' })
  supplierId: number;

  @ManyToOne(() => Supplier)
  @JoinColumn({ name: 'supplier_id' })
  supplier: Supplier;

  @Column({ name: 'store_id', nullable: true })
  storeId: number | null;

  @ManyToOne(() => RawMaterialStore)
  @JoinColumn({ name: 'store_id' })
  store: RawMaterialStore | null;

  @Column({ type: 'enum', enum: ['pending', 'received', 'cancelled'], default: 'pending' })
  status: PurchaseOrderStatus;

  @Column({ type: 'decimal', precision: 14, scale: 2, default: 0 })
  subtotal: number;

  @Column({ name: 'tax_rate', type: 'decimal', precision: 5, scale: 2, default: 0 })
  taxRate: number;

  @Column({ name: 'tax_amount', type: 'decimal', precision: 14, scale: 2, default: 0 })
  taxAmount: number;

  @Column({ name: 'total_amount', type: 'decimal', precision: 14, scale: 2, default: 0 })
  totalAmount: number;

  @CreateDateColumn({ name: 'ordered_at' })
  orderedAt: Date;

  @Column({ name: 'received_at', type: 'timestamp', nullable: true })
  receivedAt: Date | null;

  @Column({ name: 'received_by', type: 'varchar', length: 255, nullable: true })
  receivedBy: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => RawMaterialPurchaseOrderItem, (item) => item.purchaseOrder)
  items: RawMaterialPurchaseOrderItem[];
}
