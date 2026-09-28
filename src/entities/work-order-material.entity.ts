import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { WorkOrder } from './work-order.entity';
import { RawMaterial } from './raw-material.entity';

@Entity('work_order_materials')
export class WorkOrderMaterial {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'work_order_id' })
  workOrderId: number;

  @ManyToOne(() => WorkOrder, (workOrder) => workOrder.materials, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'work_order_id' })
  workOrder: WorkOrder;

  @Column({ name: 'raw_material_id' })
  rawMaterialId: number;

  @ManyToOne(() => RawMaterial)
  @JoinColumn({ name: 'raw_material_id' })
  rawMaterial: RawMaterial;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  quantity: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
