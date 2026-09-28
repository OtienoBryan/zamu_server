import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Region } from './region.entity';

@Entity('Stations')
export class Station {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', default: 0 })
  omc_id: number;

  @Column({ type: 'varchar', length: 191 })
  name: string;

  @Column({ type: 'varchar', length: 255, default: '' })
  address: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  longitude: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  latitude: string | null;

  @Column({ name: 'regionId', type: 'int' })
  regionId: number;

  @ManyToOne(() => Region)
  @JoinColumn({ name: 'regionId' })
  region?: Region;

  @Column({ type: 'varchar', length: 255, nullable: true })
  contact: string | null;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  price: number | null;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0, name: 'lpgQuantity' })
  lpgQuantity: number;
}

