import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { WorkOrder } from './work-order.entity';
import { RawMaterial } from './raw-material.entity';
import { RawMaterialStore } from './raw-material-store.entity';

export type WorkOrderWasteType = 'offcut' | 'damage';
export type WorkOrderWasteStockAction = 'returned' | 'deducted';

@Entity('work_order_waste_entries')
export class WorkOrderWasteEntry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'work_order_id' })
  workOrderId: number;

  @ManyToOne(() => WorkOrder)
  @JoinColumn({ name: 'work_order_id' })
  workOrder: WorkOrder;

  @Column({ name: 'raw_material_id' })
  rawMaterialId: number;

  @ManyToOne(() => RawMaterial)
  @JoinColumn({ name: 'raw_material_id' })
  rawMaterial: RawMaterial;

  @Column({ name: 'store_id' })
  storeId: number;

  @ManyToOne(() => RawMaterialStore)
  @JoinColumn({ name: 'store_id' })
  store: RawMaterialStore;

  @Column({ type: 'enum', enum: ['offcut', 'damage'] })
  type: WorkOrderWasteType;

  // Only meaningful for offcuts — a damage entry is always unusable.
  @Column({ type: 'boolean', default: false })
  reusable: boolean;

  @Column({ type: 'decimal', precision: 14, scale: 2 })
  quantity: number;

  // 'returned' = added back to store stock (reusable offcut), 'deducted' = removed
  // from store stock (damage, or an offcut that can't be reused).
  @Column({ name: 'stock_action', type: 'enum', enum: ['returned', 'deducted'] })
  stockAction: WorkOrderWasteStockAction;

  @Column({ type: 'varchar', length: 255, nullable: true })
  notes: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
