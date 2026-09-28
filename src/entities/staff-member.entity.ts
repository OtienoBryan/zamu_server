import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('staff_members')
export class StaffMember {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({ name: 'mobile_number', type: 'varchar', length: 20, nullable: true })
  mobileNumber: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  role: string | null;

  @Column({ name: 'hourly_rate', type: 'decimal', precision: 10, scale: 2, default: 0 })
  hourlyRate: number;

  @Column({ type: 'enum', enum: ['active', 'inactive'], default: 'active' })
  status: 'active' | 'inactive';

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
