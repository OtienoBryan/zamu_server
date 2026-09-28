import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('services')
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @Column({ type: 'decimal', precision: 10, scale: 2, transformer: {
    to: (value: number) => value,
    from: (value: string) => parseFloat(value)
  }})
  rate: number;

  @Column({ type: 'enum', enum: ['fixed', 'hourly'], default: 'fixed' })
  pricing_type: 'fixed' | 'hourly';

  @Column({ type: 'int', default: 1 })
  is_active: number;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
