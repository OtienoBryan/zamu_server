import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { RawMaterialStore } from './raw-material-store.entity';
import { Machine } from './machine.entity';

export type MachineLedgerTransactionType =
  | 'adjustment_in'
  | 'adjustment_out'
  | 'transfer_in'
  | 'transfer_out';

@Entity('machine_inventory_ledger')
export class MachineInventoryLedger {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'store_id' })
  storeId: number;

  @ManyToOne(() => RawMaterialStore)
  @JoinColumn({ name: 'store_id' })
  store: RawMaterialStore;

  @Column({ name: 'machine_id' })
  machineId: number;

  @ManyToOne(() => Machine)
  @JoinColumn({ name: 'machine_id' })
  machine: Machine;

  @Column({
    name: 'transaction_type',
    type: 'enum',
    enum: ['adjustment_in', 'adjustment_out', 'transfer_in', 'transfer_out'],
  })
  transactionType: MachineLedgerTransactionType;

  @Column({ type: 'decimal', precision: 14, scale: 2 })
  quantity: number;

  @Column({ name: 'previous_quantity', type: 'decimal', precision: 14, scale: 2 })
  previousQuantity: number;

  @Column({ name: 'new_quantity', type: 'decimal', precision: 14, scale: 2 })
  newQuantity: number;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @Column({ name: 'created_by', type: 'int', nullable: true })
  createdBy: number | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
