import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { RawMaterialStore } from './raw-material-store.entity';
import { RawMaterial } from './raw-material.entity';
import { RawMaterialPurchaseOrder } from './raw-material-purchase-order.entity';

export type InventoryLedgerTransactionType = 'purchase_receipt' | 'adjustment' | 'production_use';

@Entity('raw_material_inventory_ledger')
export class RawMaterialInventoryLedger {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'store_id' })
  storeId: number;

  @ManyToOne(() => RawMaterialStore)
  @JoinColumn({ name: 'store_id' })
  store: RawMaterialStore;

  @Column({ name: 'raw_material_id' })
  rawMaterialId: number;

  @ManyToOne(() => RawMaterial)
  @JoinColumn({ name: 'raw_material_id' })
  rawMaterial: RawMaterial;

  @Column({ name: 'purchase_order_id', nullable: true })
  purchaseOrderId: number | null;

  @ManyToOne(() => RawMaterialPurchaseOrder)
  @JoinColumn({ name: 'purchase_order_id' })
  purchaseOrder: RawMaterialPurchaseOrder | null;

  @Column({ name: 'transaction_type', type: 'enum', enum: ['purchase_receipt', 'adjustment', 'production_use'], default: 'purchase_receipt' })
  transactionType: InventoryLedgerTransactionType;

  @Column({ type: 'decimal', precision: 14, scale: 2 })
  quantity: number;

  @Column({ name: 'previous_quantity', type: 'decimal', precision: 14, scale: 2 })
  previousQuantity: number;

  @Column({ name: 'new_quantity', type: 'decimal', precision: 14, scale: 2 })
  newQuantity: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  notes: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
