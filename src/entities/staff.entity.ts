import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Department } from './department.entity';
import { Station } from './station.entity';
import { RawMaterialStore } from './raw-material-store.entity';

// Mapped to match the real `staff` table columns exactly (verified against the
// live database) — the previous version of this entity declared an `omc_id`
// column that does not exist on the actual table, which made every query
// against this entity (including login) fail with "Unknown column 'omc_id'".
@Entity('staff')
export class Staff {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  photo_url: string;

  @Column({ type: 'varchar', length: 50 })
  empl_no: string;

  @Column({ type: 'varchar', length: 50 })
  id_no: string;

  @Column({ type: 'varchar', length: 255 })
  role: string;

  @Column({ type: 'int', nullable: true })
  store_id: number | null;

  @ManyToOne(() => RawMaterialStore)
  @JoinColumn({ name: 'store_id' })
  store?: RawMaterialStore;

  @Column({ type: 'int', nullable: true })
  designation: number | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  phone_number: string | null;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'decimal', precision: 11, scale: 2, default: 0 })
  cash_balance: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  department: string | null;

  @Column({ type: 'int', nullable: true })
  department_id: number | null;

  @ManyToOne(() => Department, department => department.staff)
  @JoinColumn({ name: 'department_id' })
  department_relation?: Department;

  @Column({ type: 'varchar', length: 255, nullable: true })
  business_email: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  department_email: string | null;

  @Column({ type: 'decimal', precision: 11, scale: 2, nullable: true })
  salary: number | null;

  @Column({ type: 'varchar', length: 100, default: 'Contract' })
  employment_type: string;

  @Column({
    type: 'enum',
    enum: ['Male', 'Female', 'Other'],
    default: 'Male',
  })
  gender: 'Male' | 'Female' | 'Other';

  @Column({ type: 'int', nullable: true })
  station_id: number | null;

  @ManyToOne(() => Station)
  @JoinColumn({ name: 'station_id' })
  station?: Station;

  @Column({ type: 'int', default: 0 })
  pump_number: number;

  @Column({ type: 'text', nullable: true })
  fcm_token: string | null;

  @Column({ type: 'int', nullable: true })
  stationss: number | null;

  @Column({ type: 'int', nullable: true })
  manager_id: number | null;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @Column({ type: 'int', default: 1 })
  is_active: number;

  @Column({ type: 'varchar', length: 200, default: 'https://via.placeholder.com/150' })
  avatar_url: string;

  @Column({ type: 'int', default: 1 })
  status: number;
}
