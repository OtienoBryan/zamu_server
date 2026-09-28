import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ConversionClient } from './conversion-client.entity';
import { ConversionVehicle } from './conversion-vehicle.entity';
import { JobCardItem } from './job-card-item.entity';

@Entity('job_cards')
export class JobCard {
  @PrimaryGeneratedColumn()
  id: number;

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

  @Column({
    type: 'enum',
    enum: ['open', 'sent', 'approved', 'not_paid', 'paid', 'warranty', 'special_order', 'written_off', 'voided'],
    default: 'open',
  })
  status: 'open' | 'sent' | 'approved' | 'not_paid' | 'paid' | 'warranty' | 'special_order' | 'written_off' | 'voided';

  @Column({ type: 'int', default: 0 })
  vat_enabled: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 16, transformer: {
    to: (value: number) => value,
    from: (value: string) => parseFloat(value)
  }})
  vat_rate: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0, transformer: {
    to: (value: number) => value,
    from: (value: string) => parseFloat(value)
  }})
  discount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0, transformer: {
    to: (value: number) => value,
    from: (value: string) => parseFloat(value)
  }})
  other_charges: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0, transformer: {
    to: (value: number) => value,
    from: (value: string) => parseFloat(value)
  }})
  amount_paid: number;

  @Column({ type: 'text', nullable: true })
  notes?: string | null;

  @OneToMany(() => JobCardItem, item => item.jobCard, { cascade: true })
  items?: JobCardItem[];

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
