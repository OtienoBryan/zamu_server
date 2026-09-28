import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { PartPurchaseOrder } from './part-purchase-order.entity';
import { Part } from './part.entity';

@Entity('PartPurchaseOrderItems')
export class PartPurchaseOrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  purchase_order_id: number;

  @Column({ type: 'int' })
  part_id: number;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0, transformer: {
    to: (v: number) => v,
    from: (v: string) => v != null ? parseFloat(v) : 0,
  }})
  unit_price: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0, transformer: {
    to: (v: number) => v,
    from: (v: string) => v != null ? parseFloat(v) : 0,
  }})
  total_price: number;

  @ManyToOne(() => PartPurchaseOrder, po => po.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'purchase_order_id' })
  purchase_order: PartPurchaseOrder;

  @ManyToOne(() => Part, { eager: true })
  @JoinColumn({ name: 'part_id' })
  part: Part;
}
