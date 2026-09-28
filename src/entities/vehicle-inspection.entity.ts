import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ConversionVehicle } from './conversion-vehicle.entity';
import { ConversionClient } from './conversion-client.entity';
import { Staff } from './staff.entity';

@Entity('inspections')
export class VehicleInspection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'conversion_vehicle_id', type: 'int' })
  conversion_vehicle_id: number;

  @ManyToOne(() => ConversionVehicle)
  @JoinColumn({ name: 'conversion_vehicle_id' })
  conversionVehicle?: ConversionVehicle;

  @Column({ name: 'conversion_client_id', type: 'int' })
  conversion_client_id: number;

  @ManyToOne(() => ConversionClient)
  @JoinColumn({ name: 'conversion_client_id' })
  conversionClient?: ConversionClient;

  @Column({ name: 'assigned_staff_id', type: 'int' })
  assigned_staff_id: number;

  @ManyToOne(() => Staff)
  @JoinColumn({ name: 'assigned_staff_id' })
  technician?: Staff;

  @Column({ type: 'date' })
  inspection_date: string;

  @Column({ type: 'enum', enum: ['pending', 'in_progress', 'completed'], default: 'pending' })
  status: 'pending' | 'in_progress' | 'completed';

  @Column({ type: 'text', nullable: true })
  summary?: string | null;

  @Column({ type: 'longtext', nullable: true })
  checklist?: string | null;

  @Column({ type: 'int', default: 0 })
  issues_found: number;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
