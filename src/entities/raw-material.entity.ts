import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { RawMaterialCategory } from './raw-material-category.entity';

@Entity('raw_materials')
export class RawMaterial {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  name: string;

  @Column({ name: 'category_id', nullable: true })
  categoryId: number | null;

  @ManyToOne(() => RawMaterialCategory)
  @JoinColumn({ name: 'category_id' })
  category: RawMaterialCategory | null;

  @Column({ name: 'unit_of_measure', length: 20 })
  unitOfMeasure: string;

  @Column({ name: 'alert_quantity', type: 'decimal', precision: 12, scale: 2, default: 0 })
  alertQuantity: number;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  cost: number;

  @Column({ type: 'enum', enum: ['active', 'inactive'], default: 'active' })
  status: 'active' | 'inactive';

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
