import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Machine } from './machine.entity';
import { RawMaterialStore } from './raw-material-store.entity';
import { MachineServicePart } from './machine-service-part.entity';
import { MachineServiceWorker } from './machine-service-worker.entity';

@Entity('machine_service_records')
export class MachineServiceRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'machine_id' })
  machineId: number;

  @ManyToOne(() => Machine, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'machine_id' })
  machine: Machine;

  // The store parts were deducted from — defaults to the machine's assigned
  // store when the service is scheduled, but only set if parts were used.
  @Column({ name: 'store_id', nullable: true })
  storeId: number | null;

  @ManyToOne(() => RawMaterialStore)
  @JoinColumn({ name: 'store_id' })
  store: RawMaterialStore | null;

  @Column({ name: 'start_at', type: 'datetime' })
  startAt: Date;

  @Column({ name: 'end_at', type: 'datetime' })
  endAt: Date;

  @Column({ type: 'text' })
  description: string;

  @Column({ name: 'created_by', type: 'int', nullable: true })
  createdBy: number | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => MachineServicePart, (part) => part.serviceRecord)
  parts: MachineServicePart[];

  @OneToMany(() => MachineServiceWorker, (worker) => worker.serviceRecord)
  workers: MachineServiceWorker[];
}
