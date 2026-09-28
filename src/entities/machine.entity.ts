import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { MachineCategory } from './machine-category.entity';
import { RawMaterialStore } from './raw-material-store.entity';

@Entity('machines')
export class Machine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  name: string;

  @Column({ name: 'machine_code', type: 'varchar', length: 50, nullable: true })
  machineCode: string | null;

  @Column({ name: 'serial_number', type: 'varchar', length: 100, nullable: true })
  serialNumber: string | null;

  @Column({ name: 'category_id', nullable: true })
  categoryId: number | null;

  @ManyToOne(() => MachineCategory)
  @JoinColumn({ name: 'category_id' })
  category: MachineCategory | null;

  @Column({ name: 'store_id', nullable: true })
  storeId: number | null;

  @ManyToOne(() => RawMaterialStore)
  @JoinColumn({ name: 'store_id' })
  store: RawMaterialStore | null;

  // How often this machine should be serviced — used to work out when the
  // next maintenance is due from the last completed service record.
  @Column({ name: 'maintenance_interval_days', type: 'int', nullable: true })
  maintenanceIntervalDays: number | null;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'enum', enum: ['active', 'inactive', 'in_repair'], default: 'active' })
  status: 'active' | 'inactive' | 'in_repair';

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
