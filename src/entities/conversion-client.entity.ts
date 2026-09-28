import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('conversion_clients')
export class ConversionClient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  first_name: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  middle_name: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  surname: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email: string | null;

  @Column({ type: 'varchar', length: 50 })
  contact: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  account_number: string;

  @Column({ type: 'text', nullable: true })
  address: string | null;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'varchar', length: 191, nullable: true })
  region: string | null;

  @Column({ type: 'enum', enum: ['individual', 'company'], default: 'individual' })
  category: 'individual' | 'company';

  @Column({ type: 'enum', enum: ['individual', 'sacco', 'company'], nullable: true })
  organization_type: 'individual' | 'sacco' | 'company' | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  organization_name: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  tax_pin: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  referral_source: string | null;

  @Column({ type: 'text', nullable: true })
  referral_notes: string | null;

  @Column({ type: 'tinyint', width: 1, default: 0 })
  tax_exempt: number;

  @Column({ type: 'tinyint', width: 1, default: 0 })
  apply_discount: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  discount_rate: string | null;

  @Column({ type: 'tinyint', width: 1, default: 0 })
  labour_rate_override: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  labour_rate: string | null;

  @Column({ type: 'tinyint', width: 1, default: 0 })
  parts_markup_override: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  parts_markup: string | null;

  @Column({ type: 'tinyint', width: 1, default: 0 })
  payment_terms_override: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  payment_terms: string | null;

  @Column({ type: 'int', default: 1 })
  is_active: number;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
