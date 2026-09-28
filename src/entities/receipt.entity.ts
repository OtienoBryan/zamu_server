import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { PosSalePayment } from './pos-sale-payment.entity';
import { PosSale } from './pos-sale.entity';
import { ClientRecord } from './client-record.entity';

// One row per POS sale payment — generated automatically when a payment is
// posted (see PosSalePaymentsService.create), never created directly.
@Entity('receipts')
export class Receipt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'receipt_number', type: 'varchar', length: 50, unique: true })
  receiptNumber: string;

  @Column({ name: 'pos_sale_payment_id' })
  posSalePaymentId: number;

  @ManyToOne(() => PosSalePayment)
  @JoinColumn({ name: 'pos_sale_payment_id' })
  payment: PosSalePayment;

  @Column({ name: 'pos_sale_id' })
  posSaleId: number;

  @ManyToOne(() => PosSale)
  @JoinColumn({ name: 'pos_sale_id' })
  sale: PosSale;

  @Column({ name: 'client_id', nullable: true })
  clientId: number | null;

  @ManyToOne(() => ClientRecord)
  @JoinColumn({ name: 'client_id' })
  client: ClientRecord | null;

  @Column({ type: 'decimal', precision: 14, scale: 2 })
  amount: number;

  @Column({ name: 'payment_date', type: 'date' })
  paymentDate: string;

  // A snapshot of the chart-of-account name at payment time, so the receipt
  // stays accurate even if that account is later renamed.
  @Column({ name: 'payment_method', type: 'varchar', length: 150 })
  paymentMethod: string;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @Column({ name: 'created_by', type: 'int', nullable: true })
  createdBy: number | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
