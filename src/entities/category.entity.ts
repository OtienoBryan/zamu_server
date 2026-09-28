import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Category')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 191, unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;
}
