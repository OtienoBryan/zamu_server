import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { MachineServiceRecord } from './machine-service-record.entity';
import { SparePart } from './spare-part.entity';

@Entity('machine_service_parts')
export class MachineServicePart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'service_record_id' })
  serviceRecordId: number;

  @ManyToOne(() => MachineServiceRecord, (record) => record.parts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'service_record_id' })
  serviceRecord: MachineServiceRecord;

  @Column({ name: 'spare_part_id' })
  sparePartId: number;

  @ManyToOne(() => SparePart)
  @JoinColumn({ name: 'spare_part_id' })
  sparePart: SparePart;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  quantity: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
