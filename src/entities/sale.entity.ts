import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Station } from './station.entity';
import { KeyAccount } from './key-account.entity';
import { Vehicle } from './vehicle.entity';
import { ConversionClient } from './conversion-client.entity';
import { ConversionVehicle } from './conversion-vehicle.entity';

export enum ClientType {
  REGULAR = 'regular',
  KEY_ACCOUNT = 'key_account',
}

export enum PaymentMethod {
  CASH = 'CASH',
  CARD = 'CARD',
  MPESA = 'MPESA',
  CREDIT = 'CREDIT',
  OTHER = 'other',
}

@Entity('sales')
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'station_id' })
  stationId: number;

  @ManyToOne(() => Station)
  @JoinColumn({ name: 'station_id' })
  station?: Station;

  @Column({
    name: 'client_type',
    type: 'enum',
    enum: ClientType,
  })
  clientType: ClientType;

  @Column({ name: 'key_account_id', nullable: true })
  keyAccountId?: number;

  @ManyToOne(() => KeyAccount)
  @JoinColumn({ name: 'key_account_id' })
  keyAccount?: KeyAccount;

  @Column({ name: 'vehicle_id', nullable: true })
  vehicleId?: number;

  @ManyToOne(() => Vehicle)
  @JoinColumn({ name: 'vehicle_id' })
  vehicle?: Vehicle;

  @Column({ name: 'conversion_client_id', nullable: true })
  conversionClientId?: number;

  @ManyToOne(() => ConversionClient)
  @JoinColumn({ name: 'conversion_client_id' })
  conversionClient?: ConversionClient;

  @Column({ name: 'conversion_vehicle_id', nullable: true })
  conversionVehicleId?: number;

  @ManyToOne(() => ConversionVehicle)
  @JoinColumn({ name: 'conversion_vehicle_id' })
  conversionVehicle?: ConversionVehicle;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  quantity: number;

  @Column({ name: 'unit_price', type: 'decimal', precision: 10, scale: 2 })
  unitPrice: number;

  @Column({ name: 'total_amount', type: 'decimal', precision: 15, scale: 2 })
  totalAmount: number;

  @Column({ name: 'payment_method', type: 'enum', enum: PaymentMethod, nullable: true })
  paymentMethod?: PaymentMethod;

  @Column({ name: 'sale_date', type: 'datetime' })
  saleDate: Date;

  @Column({ name: 'reference_number', type: 'varchar', length: 255, nullable: true })
  referenceNumber?: string;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @Column({ name: 'image_path', type: 'varchar', length: 500, nullable: true })
  imagePath?: string;

  @Column({ name: 'created_by', nullable: true })
  createdBy?: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

