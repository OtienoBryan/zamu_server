import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { FinishedProduct } from './finished-product.entity';
import { ProductionStage } from './production-stage.entity';
import { StaffMember } from './staff-member.entity';
import { WorkOrderStaff } from './work-order-staff.entity';
import { WorkOrderMaterial } from './work-order-material.entity';

export type WorkOrderStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';

@Entity('work_orders')
export class WorkOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ name: 'product_id' })
  productId: number;

  @ManyToOne(() => FinishedProduct)
  @JoinColumn({ name: 'product_id' })
  product: FinishedProduct;

  @Column({ name: 'stage_id' })
  stageId: number;

  @ManyToOne(() => ProductionStage)
  @JoinColumn({ name: 'stage_id' })
  stage: ProductionStage;

  @Column({ name: 'staff_id' })
  staffId: number;

  @ManyToOne(() => StaffMember)
  @JoinColumn({ name: 'staff_id' })
  staff: StaffMember;

  @Column({ type: 'date' })
  date: string;

  @Column({ name: 'target_quantity', type: 'decimal', precision: 12, scale: 2 })
  targetQuantity: number;

  @Column({ type: 'enum', enum: ['pending', 'in_progress', 'completed', 'cancelled'], default: 'pending' })
  status: WorkOrderStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => WorkOrderStaff, (assigned) => assigned.workOrder)
  assignedStaff: WorkOrderStaff[];

  @OneToMany(() => WorkOrderMaterial, (material) => material.workOrder)
  materials: WorkOrderMaterial[];
}
