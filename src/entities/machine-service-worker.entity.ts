import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { MachineServiceRecord } from './machine-service-record.entity';
import { StaffMember } from './staff-member.entity';

@Entity('machine_service_workers')
export class MachineServiceWorker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'service_record_id' })
  serviceRecordId: number;

  @ManyToOne(() => MachineServiceRecord, (record) => record.workers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'service_record_id' })
  serviceRecord: MachineServiceRecord;

  @Column({ name: 'staff_member_id' })
  staffMemberId: number;

  @ManyToOne(() => StaffMember)
  @JoinColumn({ name: 'staff_member_id' })
  staffMember: StaffMember;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
