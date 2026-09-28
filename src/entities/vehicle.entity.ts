import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { KeyAccount } from './key-account.entity';

@Entity('Vehicles')
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'key_account_id', type: 'int' })
  key_account_id: number;

  @ManyToOne(() => KeyAccount)
  @JoinColumn({ name: 'key_account_id' })
  keyAccount?: KeyAccount;

  @Column({ type: 'varchar', length: 50 })
  registration_number: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  vin_serial_number?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  vehicle_type?: string;

  @Column({ type: 'int', nullable: true })
  year?: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  make?: string;

  @Column({ type: 'varchar', length: 255 })
  model: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  trim_option?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  transmission_type?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  driven_wheel?: string;

  @Column({ type: 'int', nullable: true })
  current_odo?: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  color?: string;

  @Column({ type: 'varchar', length: 255 })
  driver_name: string;

  @Column({ type: 'varchar', length: 50 })
  driver_contact: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
