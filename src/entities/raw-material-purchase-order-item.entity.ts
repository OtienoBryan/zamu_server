import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { RawMaterialPurchaseOrder } from './raw-material-purchase-order.entity';
import { RawMaterial } from './raw-material.entity';

@Entity('raw_material_purchase_order_items')
export class RawMaterialPurchaseOrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'purchase_order_id' })
  purchaseOrderId: number;

  @ManyToOne(() => RawMaterialPurchaseOrder, (po) => po.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'purchase_order_id' })
  purchaseOrder: RawMaterialPurchaseOrder;

  @Column({ name: 'raw_material_id' })
  rawMaterialId: number;

  @ManyToOne(() => RawMaterial)
  @JoinColumn({ name: 'raw_material_id' })
  rawMaterial: RawMaterial;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  quantity: number;

  // Set when the PO is received — the quantity the user actually confirmed
  // against the ordered quantity, which is what gets posted to inventory.
  // Null while the PO is still pending.
  @Column({ name: 'received_quantity', type: 'decimal', precision: 12, scale: 2, nullable: true })
  receivedQuantity: number | null;

  @Column({ name: 'unit_cost', type: 'decimal', precision: 12, scale: 2 })
  unitCost: number;

  @Column({ name: 'total_cost', type: 'decimal', precision: 14, scale: 2 })
  totalCost: number;
}
