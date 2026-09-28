import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('finished_product_categories')
export class FinishedProductCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
