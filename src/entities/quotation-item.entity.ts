import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Quotation } from './quotation.entity';
import { FinishedProduct } from './finished-product.entity';

@Entity('quotation_items')
export class QuotationItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'quotation_id' })
  quotationId: number;

  @ManyToOne(() => Quotation, (quotation) => quotation.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'quotation_id' })
  quotation: Quotation;

  @Column({ name: 'product_id' })
  productId: number;

  @ManyToOne(() => FinishedProduct)
  @JoinColumn({ name: 'product_id' })
  product: FinishedProduct;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  quantity: number;

  @Column({ name: 'unit_price', type: 'decimal', precision: 12, scale: 2 })
  unitPrice: number;

  @Column({ name: 'total_price', type: 'decimal', precision: 14, scale: 2 })
  totalPrice: number;
}
