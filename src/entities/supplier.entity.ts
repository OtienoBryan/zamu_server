import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('suppliers')
export class Supplier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({ name: 'mobile_number', type: 'varchar', length: 20, nullable: true })
  mobileNumber: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  location: string | null;

  @Column({ name: 'payment_terms_days', type: 'int', nullable: true, default: 30 })
  paymentTermsDays: number | null;

  @Column({ name: 'credit_limit', type: 'decimal', precision: 14, scale: 2, nullable: true, default: 0 })
  creditLimit: number | null;

  @Column({ name: 'tax_pin', type: 'varchar', length: 50, nullable: true })
  taxPin: string | null;

  @Column({ type: 'decimal', precision: 14, scale: 2, default: 0 })
  balance: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
