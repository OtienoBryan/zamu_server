import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { SparePartCategory } from './spare-part-category.entity';

@Entity('spare_parts')
export class SparePart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  name: string;

  @Column({ name: 'category_id', nullable: true })
  categoryId: number | null;

  @ManyToOne(() => SparePartCategory)
  @JoinColumn({ name: 'category_id' })
  category: SparePartCategory | null;

  @Column({ name: 'part_number', type: 'varchar', length: 100, nullable: true })
  partNumber: string | null;

  @Column({ name: 'unit_of_measure', length: 20 })
  unitOfMeasure: string;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  quantity: number;

  @Column({ name: 'alert_quantity', type: 'decimal', precision: 12, scale: 2, default: 0 })
  alertQuantity: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  cost: number;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'enum', enum: ['active', 'inactive'], default: 'active' })
  status: 'active' | 'inactive';

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
