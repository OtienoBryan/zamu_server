import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { PosSaleItem } from './pos-sale-item.entity';
import { ClientRecord } from './client-record.entity';
import { RawMaterialStore } from './raw-material-store.entity';
import { Staff } from './staff.entity';

@Entity('pos_sales')
export class PosSale {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'client_id', type: 'int', nullable: true })
  clientId: number | null;

  @ManyToOne(() => ClientRecord)
  @JoinColumn({ name: 'client_id' })
  client: ClientRecord | null;

  @Column({ name: 'store_id', type: 'int', nullable: true })
  storeId: number | null;

  @ManyToOne(() => RawMaterialStore)
  @JoinColumn({ name: 'store_id' })
  store: RawMaterialStore | null;

  @Column({ type: 'decimal', precision: 14, scale: 2, default: 0 })
  subtotal: number;

  @Column({ name: 'tax_rate', type: 'decimal', precision: 5, scale: 2, default: 0 })
  taxRate: number;

  @Column({ name: 'tax_amount', type: 'decimal', precision: 14, scale: 2, default: 0 })
  taxAmount: number;

  @Column({ name: 'total_amount', type: 'decimal', precision: 14, scale: 2, default: 0 })
  totalAmount: number;

  @Column({ name: 'created_by', type: 'int', nullable: true })
  createdBy: number | null;

  @ManyToOne(() => Staff)
  @JoinColumn({ name: 'created_by' })
  postedByStaff: Staff | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => PosSaleItem, (item) => item.sale)
  items: PosSaleItem[];
}
