import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('raw_material_stores')
export class RawMaterialStore {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  location: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
