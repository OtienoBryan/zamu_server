import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Inventory } from './inventory.entity';
import { Station } from './station.entity';
import { Part } from './part.entity';
import { TransactionType } from '../inventory/dto/inventory-transaction.dto';

@Entity('parts_inventory_ledger')
export class InventoryLedger {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'inventory_id', type: 'int' })
  inventory_id: number;

  @Column({ name: 'store_id', type: 'int' })
  store_id: number;

  @Column({ name: 'part_id', type: 'int' })
  part_id: number;

  @Column({ 
    name: 'transaction_type', 
    type: 'enum', 
    enum: ['IN', 'OUT', 'ADJUSTMENT', 'TRANSFER_IN', 'TRANSFER_OUT'] 
  })
  transaction_type: TransactionType;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ name: 'previous_quantity', type: 'int' })
  previous_quantity: number;

  @Column({ name: 'new_quantity', type: 'int' })
  new_quantity: number;

  @Column({ name: 'reference_number', type: 'varchar', length: 100, nullable: true })
  reference_number?: string | null;

  @Column({ type: 'text', nullable: true })
  notes?: string | null;

  @Column({ name: 'created_by', type: 'int', nullable: true })
  created_by?: number | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  created_at: Date;

  @ManyToOne(() => Inventory)
  @JoinColumn({ name: 'inventory_id' })
  inventory?: Inventory;

  @ManyToOne(() => Station)
  @JoinColumn({ name: 'store_id' })
  store?: Station;

  @ManyToOne(() => Part)
  @JoinColumn({ name: 'part_id' })
  part?: Part;
}
