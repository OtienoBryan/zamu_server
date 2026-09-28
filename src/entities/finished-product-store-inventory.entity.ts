import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { RawMaterialStore } from './raw-material-store.entity';
import { FinishedProduct } from './finished-product.entity';

@Entity('finished_product_store_inventory')
export class FinishedProductStoreInventory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'store_id' })
  storeId: number;

  @ManyToOne(() => RawMaterialStore)
  @JoinColumn({ name: 'store_id' })
  store: RawMaterialStore;

  @Column({ name: 'product_id' })
  productId: number;

  @ManyToOne(() => FinishedProduct)
  @JoinColumn({ name: 'product_id' })
  product: FinishedProduct;

  @Column({ type: 'decimal', precision: 14, scale: 2, default: 0 })
  quantity: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
