import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

/**
 * Maps to the pre-existing `shifts` table (populated by the station attendant
 * mobile app) — station check-in/checkout attendance with geo-location and pump
 * assignment. Read-only from the admin app; column names/types mirror the live
 * schema exactly (createdAt/updatedAt/approvedAt are varchar, not real timestamps,
 * so they're kept as plain strings rather than TypeORM date columns).
 */
@Entity('shifts')
export class Shift {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime' })
  date: Date;

  @Column({ type: 'varchar', length: 191 })
  time: string;

  @Column({ type: 'int', nullable: true })
  userId: number | null;

  @Column({ type: 'varchar', length: 200 })
  userName: string;

  @Column({ type: 'int' })
  station_id: number;

  @Column({ type: 'varchar', length: 100 })
  station_name: string;

  @Column({ type: 'int', default: 0 })
  status: number;

  @Column({ type: 'datetime', nullable: true })
  checkInTime: Date | null;

  @Column({ type: 'double', nullable: true })
  latitude: number | null;

  @Column({ type: 'double', nullable: true })
  longitude: number | null;

  @Column({ type: 'varchar', length: 191, nullable: true })
  imageUrl: string | null;

  @Column({ type: 'varchar', length: 191, nullable: true })
  notes: string | null;

  @Column({ type: 'int' })
  pump_number: number;

  @Column({ type: 'double', nullable: true })
  checkoutLatitude: number | null;

  @Column({ type: 'double', nullable: true })
  checkoutLongitude: number | null;

  @Column({ type: 'datetime', nullable: true })
  checkoutTime: Date | null;

  @Column({ type: 'tinyint', width: 1, default: 1 })
  showUpdateLocation: number;

  @Column({ type: 'int', nullable: true })
  routeId: number | null;

  @Column({ type: 'varchar', length: 50 })
  createdAt: string;

  @Column({ type: 'varchar', length: 50 })
  updatedAt: string;

  @Column({ type: 'varchar', length: 100 })
  outlet_address: string;

  @Column({ type: 'varchar', length: 100 })
  approvedAt: string;
}
