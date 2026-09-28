import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { FinishedProductCategory } from './finished-product-category.entity';

@Entity('finished_products')
export class FinishedProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ name: 'image_url', type: 'varchar', length: 500, nullable: true })
  imageUrl: string | null;

  @Column({ name: 'image_public_id', type: 'varchar', length: 255, nullable: true })
  imagePublicId: string | null;

  @Column({ name: 'selling_price', type: 'decimal', precision: 12, scale: 2, default: 0 })
  sellingPrice: number;

  // Cached sum of (raw material cost × quantity) across the product's bill of
  // materials — recomputed whenever a line is added, changed, or removed.
  @Column({ name: 'production_cost', type: 'decimal', precision: 12, scale: 2, default: 0 })
  productionCost: number;

  @Column({ type: 'enum', enum: ['active', 'inactive'], default: 'active' })
  status: 'active' | 'inactive';

  @Column({ name: 'category_id', nullable: true })
  categoryId: number | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  color: string | null;

  @ManyToOne(() => FinishedProductCategory)
  @JoinColumn({ name: 'category_id' })
  category: FinishedProductCategory | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
