import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('Vendors')
export class Vendor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  tax_pin: string | null;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0.00, transformer: {
    to: (v: number) => v,
    from: (v: string) => v != null ? parseFloat(v) : 0,
  }})
  current_balance: number;

  @Column({ type: 'varchar', length: 50, default: 'active' })
  status: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  phone: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  contact_person: string | null;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
