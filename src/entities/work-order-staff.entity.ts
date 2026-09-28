import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { WorkOrder } from './work-order.entity';
import { StaffMember } from './staff-member.entity';

@Entity('work_order_staff')
export class WorkOrderStaff {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'work_order_id' })
  workOrderId: number;

  @ManyToOne(() => WorkOrder, (workOrder) => workOrder.assignedStaff, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'work_order_id' })
  workOrder: WorkOrder;

  @Column({ name: 'staff_member_id' })
  staffMemberId: number;

  @ManyToOne(() => StaffMember)
  @JoinColumn({ name: 'staff_member_id' })
  staffMember: StaffMember;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
