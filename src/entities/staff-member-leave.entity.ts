import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { StaffMember } from './staff-member.entity';

export type StaffLeaveType = 'annual' | 'sick' | 'unpaid' | 'compassionate' | 'maternity_paternity' | 'other';

export const STAFF_LEAVE_TYPES: StaffLeaveType[] = ['annual', 'sick', 'unpaid', 'compassionate', 'maternity_paternity', 'other'];

export type StaffLeaveStatus = 'pending' | 'approved' | 'declined';

// Distinct from the pre-existing `staff_leaves` table (a different, read-only
// domain keyed to `staff.id` — see StaffLeave entity). This one tracks leave
// for `staff_members`, the woodwork production-staff roster.
@Entity('staff_member_leaves')
export class StaffMemberLeave {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'staff_member_id' })
  staffMemberId: number;

  @ManyToOne(() => StaffMember)
  @JoinColumn({ name: 'staff_member_id' })
  staffMember: StaffMember;

  @Column({ name: 'leave_type', type: 'enum', enum: STAFF_LEAVE_TYPES, default: 'annual' })
  leaveType: StaffLeaveType;

  @Column({ name: 'start_date', type: 'date' })
  startDate: string;

  @Column({ name: 'end_date', type: 'date' })
  endDate: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  reason: string | null;

  @Column({ type: 'enum', enum: ['pending', 'approved', 'declined'], default: 'pending' })
  status: StaffLeaveStatus;

  @Column({ name: 'decision_notes', type: 'varchar', length: 255, nullable: true })
  decisionNotes: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
