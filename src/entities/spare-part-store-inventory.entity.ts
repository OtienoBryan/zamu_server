import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { RawMaterialStore } from './raw-material-store.entity';
import { SparePart } from './spare-part.entity';

@Entity('spare_part_store_inventory')
export class SparePartStoreInventory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'store_id' })
  storeId: number;

  @ManyToOne(() => RawMaterialStore)
  @JoinColumn({ name: 'store_id' })
  store: RawMaterialStore;

  @Column({ name: 'spare_part_id' })
  sparePartId: number;

  @ManyToOne(() => SparePart)
  @JoinColumn({ name: 'spare_part_id' })
  sparePart: SparePart;

  @Column({ type: 'decimal', precision: 14, scale: 2, default: 0 })
  quantity: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
