import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export type VendorTransactionType = 'PURCHASE' | 'PAYMENT' | 'ADJUSTMENT';

@Entity('VendorLedger')
export class VendorLedger {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'vendor_id', type: 'int' })
  vendor_id: number;

  @Column({ type: 'varchar', length: 20 })
  transaction_type: VendorTransactionType;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0, transformer: {
    to: (v: number) => v,
    from: (v: string) => v != null ? parseFloat(v) : 0,
  }})
  debit: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0, transformer: {
    to: (v: number) => v,
    from: (v: string) => v != null ? parseFloat(v) : 0,
  }})
  credit: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0, transformer: {
    to: (v: number) => v,
    from: (v: string) => v != null ? parseFloat(v) : 0,
  }})
  balance: number;

  @Column({ name: 'reference_number', type: 'varchar', length: 100, nullable: true })
  reference_number?: string | null;

  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @Column({ type: 'text', nullable: true })
  notes?: string | null;

  @Column({ name: 'created_by', type: 'int', nullable: true })
  created_by?: number | null;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
}
