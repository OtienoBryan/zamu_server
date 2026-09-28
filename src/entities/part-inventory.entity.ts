import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, UpdateDateColumn } from 'typeorm';
import { Part } from './part.entity';

@Entity('parts_inventory')
export class PartInventory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'store_id', type: 'int' })
  store_id: number;

  @Column({ name: 'part_id', type: 'int' })
  part_id: number;

  @ManyToOne(() => Part)
  @JoinColumn({ name: 'part_id' })
  part?: Part;

  @Column({ type: 'int', default: 0 })
  quantity: number;

  @Column({ type: 'int', nullable: true, default: 0 })
  min_stock_level?: number | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  location?: string | null;

  @UpdateDateColumn({ name: 'last_updated' })
  last_updated: Date;
}
