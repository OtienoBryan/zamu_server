import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('Parts')
export class Part {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  part_number: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  category?: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  manufacturer?: string | null;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true, transformer: {
    to: (value: number) => value,
    from: (value: string) => parseFloat(value)
  }})
  unit_price?: number | null;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true, transformer: {
    to: (value: number) => value,
    from: (value: string) => value != null ? parseFloat(value) : null
  }})
  unit_price_usd?: number | null;

  @Column({ type: 'int', nullable: true, default: 0 })
  stock_quantity?: number | null;

  @Column({ type: 'int', nullable: true, default: 0 })
  min_stock_level?: number | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  location?: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  unit?: string | null;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true, transformer: {
    to: (value: number) => value,
    from: (value: string) => value != null ? parseFloat(value) : null
  }})
  purchase_cost?: number | null;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true, transformer: {
    to: (value: number) => value,
    from: (value: string) => value != null ? parseFloat(value) : null
  }})
  selling_price?: number | null;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true, transformer: {
    to: (value: number) => value,
    from: (value: string) => value != null ? parseFloat(value) : null
  }})
  selling_price_usd?: number | null;

  @Column({ type: 'varchar', length: 50, nullable: true, default: 'active' })
  status?: string | null;

  @Column({ type: 'text', nullable: true })
  notes?: string | null;

  @Column({ type: 'varchar', length: 500, nullable: true })
  image_url?: string | null;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}

