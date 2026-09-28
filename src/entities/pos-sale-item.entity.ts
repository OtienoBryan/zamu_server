import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { PosSale } from './pos-sale.entity';
import { FinishedProduct } from './finished-product.entity';

@Entity('pos_sale_items')
export class PosSaleItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'pos_sale_id' })
  posSaleId: number;

  @ManyToOne(() => PosSale, (sale) => sale.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'pos_sale_id' })
  sale: PosSale;

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
