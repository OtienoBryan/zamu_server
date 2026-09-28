import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { RawMaterialStore } from './raw-material-store.entity';
import { Machine } from './machine.entity';

@Entity('machine_store_inventory')
export class MachineStoreInventory {
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

  @Column({ type: 'decimal', precision: 14, scale: 2, default: 0 })
  quantity: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
