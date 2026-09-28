import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { WorkOrderLog } from './work-order-log.entity';
import { StaffMember } from './staff-member.entity';
import { ChartOfAccount } from './chart-of-account.entity';

@Entity('labour_payments')
export class LabourPayment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'work_order_log_id' })
  workOrderLogId: number;

  @ManyToOne(() => WorkOrderLog)
  @JoinColumn({ name: 'work_order_log_id' })
  workOrderLog: WorkOrderLog;

  @Column({ name: 'staff_id' })
  staffId: number;

  @ManyToOne(() => StaffMember)
  @JoinColumn({ name: 'staff_id' })
  staff: StaffMember;

  @Column({ name: 'payment_account_id' })
  paymentAccountId: number;

  @ManyToOne(() => ChartOfAccount)
  @JoinColumn({ name: 'payment_account_id' })
  paymentAccount: ChartOfAccount;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount: number;

  @Column({ name: 'payment_date', type: 'date' })
  paymentDate: string;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
