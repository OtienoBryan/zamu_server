import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

/**
 * Maps to the pre-existing `staff_leaves` table — approved/pending leave requests
 * tied directly to `staff.id`. Read-only from the admin app.
 */
@Entity('staff_leaves')
export class StaffLeave {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  staff_id: number;

  @Column({ type: 'int' })
  leave_type_id: number;

  @Column({ type: 'date' })
  start_date: Date;

  @Column({ type: 'date' })
  end_date: Date;

  @Column({ type: 'text', nullable: true })
  reason: string | null;

  @Column({ type: 'varchar', length: 500, nullable: true })
  attachment_url: string | null;

  @Column({ type: 'enum', enum: ['pending', 'approved', 'rejected', 'cancelled'], default: 'pending' })
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';

  @Column({ type: 'tinyint', width: 1, default: 0 })
  is_half_day: number;

  @Column({ type: 'int', nullable: true })
  approved_by: number | null;

  @Column({ type: 'timestamp' })
  applied_at: Date;

  @Column({ type: 'timestamp' })
  updated_at: Date;
}
