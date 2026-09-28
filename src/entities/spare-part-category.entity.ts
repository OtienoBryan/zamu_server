import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('spare_part_categories')
export class SparePartCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
