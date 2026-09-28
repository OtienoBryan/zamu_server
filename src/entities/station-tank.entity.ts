import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Station } from './station.entity';

// MySQL returns DECIMAL as a string; parse so callers get numbers.
const decimal = {
  to: (value: number) => value,
  from: (value: string | null) => (value === null ? 0 : parseFloat(value)),
};

/** A physical LPG tank at a station. A station's stock is the sum of its tanks. */
@Entity('station_tanks')
export class StationTank {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'station_id', type: 'int' })
  station_id: number;

  @ManyToOne(() => Station)
  @JoinColumn({ name: 'station_id' })
  station?: Station;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0, transformer: decimal })
  capacity: number;

  @Column({ name: 'current_quantity', type: 'decimal', precision: 10, scale: 2, default: 0, transformer: decimal })
  current_quantity: number;

  @Column({ type: 'enum', enum: ['active', 'inactive', 'maintenance'], default: 'active' })
  status: 'active' | 'inactive' | 'maintenance';

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
