import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

/**
 * An accountant's posted (physically-collected) amount per payment method for a
 * station over a period, alongside a snapshot of the system-calculated total at
 * posting time — the variance is derived (posted - system), not stored, so it
 * always reflects what was actually compared at the moment of posting.
 */
@Entity('sales_postings')
export class SalesPosting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  station_id: number;

  @Column({ type: 'date' })
  period_start: Date;

  @Column({ type: 'date' })
  period_end: Date;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  cash_posted: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  card_posted: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  mpesa_posted: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  credit_posted: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  other_posted: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  cash_system: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  card_system: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  mpesa_system: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  credit_system: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  other_system: number;

  @Column({ type: 'varchar', length: 500, nullable: true })
  notes: string | null;

  @Column({ type: 'int', nullable: true })
  posted_by: number | null;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
}
