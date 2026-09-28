import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { StaffMember } from './staff-member.entity';

@Entity('staff_attendance')
export class StaffAttendance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'staff_member_id' })
  staffMemberId: number;

  @ManyToOne(() => StaffMember)
  @JoinColumn({ name: 'staff_member_id' })
  staffMember: StaffMember;

  @Column({ name: 'check_in_at', type: 'datetime' })
  checkInAt: Date;

  @Column({ name: 'check_out_at', type: 'datetime', nullable: true })
  checkOutAt: Date | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  notes: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
