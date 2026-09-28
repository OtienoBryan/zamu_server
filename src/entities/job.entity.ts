import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { FinishedProduct } from './finished-product.entity';

export type JobStatus = 'open' | 'completed' | 'cancelled';

@Entity('jobs')
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'product_id', nullable: true })
  productId: number | null;

  @ManyToOne(() => FinishedProduct)
  @JoinColumn({ name: 'product_id' })
  product: FinishedProduct | null;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  quantity: number | null;

  @Column({ name: 'start_date', type: 'date', nullable: true })
  startDate: string | null;

  @Column({ name: 'expected_end_date', type: 'date', nullable: true })
  expectedEndDate: string | null;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @Column({ type: 'enum', enum: ['open', 'completed', 'cancelled'], default: 'open' })
  status: JobStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
