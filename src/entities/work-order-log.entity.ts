import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { WorkOrder } from './work-order.entity';

@Entity('work_order_logs')
export class WorkOrderLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'work_order_id' })
  workOrderId: number;

  @ManyToOne(() => WorkOrder)
  @JoinColumn({ name: 'work_order_id' })
  workOrder: WorkOrder;

  @Column({ name: 'start_time', type: 'datetime' })
  startTime: Date;

  @Column({ name: 'end_time', type: 'datetime' })
  endTime: Date;

  @Column({ name: 'quantity_done', type: 'decimal', precision: 12, scale: 2 })
  quantityDone: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
