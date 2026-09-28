import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, UpdateDateColumn } from 'typeorm';
import { RawMaterialStore } from './raw-material-store.entity';
import { RawMaterial } from './raw-material.entity';

@Entity('raw_material_store_inventory')
export class RawMaterialStoreInventory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'store_id' })
  storeId: number;

  @ManyToOne(() => RawMaterialStore)
  @JoinColumn({ name: 'store_id' })
  store: RawMaterialStore;

  @Column({ name: 'raw_material_id' })
  rawMaterialId: number;

  @ManyToOne(() => RawMaterial)
  @JoinColumn({ name: 'raw_material_id' })
  rawMaterial: RawMaterial;

  @Column({ type: 'decimal', precision: 14, scale: 2, default: 0 })
  quantity: number;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
