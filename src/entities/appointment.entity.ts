import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ConversionClient } from './conversion-client.entity';
import { ConversionVehicle } from './conversion-vehicle.entity';

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  location?: string | null;

  @Column({ type: 'datetime' })
  appointment_date: Date;

  @Column({ type: 'datetime', nullable: true })
  end_date?: Date | null;

  @Column({ name: 'conversion_client_id', type: 'int', nullable: true })
  conversion_client_id?: number | null;

  @ManyToOne(() => ConversionClient)
  @JoinColumn({ name: 'conversion_client_id' })
  conversionClient?: ConversionClient;

  @Column({ name: 'conversion_vehicle_id', type: 'int', nullable: true })
  conversion_vehicle_id?: number | null;

  @ManyToOne(() => ConversionVehicle)
  @JoinColumn({ name: 'conversion_vehicle_id' })
  conversionVehicle?: ConversionVehicle;

  @Column({ type: 'enum', enum: ['scheduled', 'completed', 'cancelled'], default: 'scheduled' })
  status: 'scheduled' | 'completed' | 'cancelled';

  @Column({ name: 'created_by', type: 'int', nullable: true })
  created_by?: number | null;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
