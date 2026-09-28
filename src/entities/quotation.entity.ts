import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { QuotationItem } from './quotation-item.entity';
import { ClientRecord } from './client-record.entity';
import { Staff } from './staff.entity';
import { PosSale } from './pos-sale.entity';

@Entity('quotations')
export class Quotation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'client_id', type: 'int', nullable: true })
  clientId: number | null;

  @ManyToOne(() => ClientRecord)
  @JoinColumn({ name: 'client_id' })
  client: ClientRecord | null;

  @Column({ type: 'decimal', precision: 14, scale: 2, default: 0 })
  subtotal: number;

  @Column({ name: 'tax_rate', type: 'decimal', precision: 5, scale: 2, default: 0 })
  taxRate: number;

  @Column({ name: 'tax_amount', type: 'decimal', precision: 14, scale: 2, default: 0 })
  taxAmount: number;

  @Column({ name: 'total_amount', type: 'decimal', precision: 14, scale: 2, default: 0 })
  totalAmount: number;

  @Column({ name: 'valid_until', type: 'date', nullable: true })
  validUntil: string | null;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  // Set once this quotation has been turned into a real POS sale (invoice) —
  // after that it's read-only: no further edits, no re-conversion.
  @Column({ name: 'converted_sale_id', type: 'int', nullable: true })
  convertedSaleId: number | null;

  @ManyToOne(() => PosSale)
  @JoinColumn({ name: 'converted_sale_id' })
  convertedSale: PosSale | null;

  @Column({ name: 'created_by', type: 'int', nullable: true })
  createdBy: number | null;

  @ManyToOne(() => Staff)
  @JoinColumn({ name: 'created_by' })
  createdByStaff: Staff | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => QuotationItem, (item) => item.quotation)
  items: QuotationItem[];
}
