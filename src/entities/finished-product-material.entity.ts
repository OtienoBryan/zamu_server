import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { FinishedProduct } from './finished-product.entity';
import { RawMaterial } from './raw-material.entity';

@Entity('finished_product_materials')
export class FinishedProductMaterial {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'finished_product_id' })
  finishedProductId: number;

  @ManyToOne(() => FinishedProduct, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'finished_product_id' })
  finishedProduct: FinishedProduct;

  @Column({ name: 'raw_material_id' })
  rawMaterialId: number;

  @ManyToOne(() => RawMaterial)
  @JoinColumn({ name: 'raw_material_id' })
  rawMaterial: RawMaterial;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  quantity: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
