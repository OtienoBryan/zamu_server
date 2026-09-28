import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Station } from './station.entity';
import { Staff } from './staff.entity';

// MySQL returns DECIMAL as a string; parse so callers get numbers.
const decimal = {
  to: (value: number) => value,
  from: (value: string | null) => (value === null ? 0 : parseFloat(value)),
};

/**
 * Station LPG stock movements. Distinct from the parts ledger in
 * inventory-ledger.entity.ts, which maps to `parts_inventory_ledger`.
 */
@Entity('InventoryLedger')
export class StationLpgLedger {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'stationId', type: 'int' })
  stationId: number;

  @ManyToOne(() => Station)
  @JoinColumn({ name: 'stationId' })
  station?: Station;

  @Column({ name: 'transactionType', type: 'enum', enum: ['IN', 'OUT', 'ADJUSTMENT'] })
  transactionType: 'IN' | 'OUT' | 'ADJUSTMENT';

  @Column({ name: 'quantityIn', type: 'decimal', precision: 10, scale: 2, nullable: true, default: 0, transformer: decimal })
  quantityIn: number;

  @Column({ name: 'quantityOut', type: 'decimal', precision: 10, scale: 2, nullable: true, default: 0, transformer: decimal })
  quantityOut: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, transformer: decimal })
  balance: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, transformer: decimal })
  quantity: number;

  @Column({ name: 'previousQuantity', type: 'decimal', precision: 10, scale: 2, default: 0, transformer: decimal })
  previousQuantity: number;

  @Column({ name: 'newQuantity', type: 'decimal', precision: 10, scale: 2, transformer: decimal })
  newQuantity: number;

  @Column({ name: 'referenceNumber', type: 'varchar', length: 255, nullable: true })
  referenceNumber?: string | null;

  @Column({ type: 'text', nullable: true })
  notes?: string | null;

  @Column({ name: 'createdBy', type: 'int', nullable: true })
  createdBy?: number | null;

  @ManyToOne(() => Staff)
  @JoinColumn({ name: 'createdBy' })
  createdByStaff?: Staff;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  created_at: Date;
}
