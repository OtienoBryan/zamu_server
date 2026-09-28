import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('machine_categories')
export class MachineCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
