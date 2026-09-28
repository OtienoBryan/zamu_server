import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('raw_material_categories')
export class RawMaterialCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
