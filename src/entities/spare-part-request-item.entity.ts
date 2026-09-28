import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { SparePartRequest } from './spare-part-request.entity';
import { SparePart } from './spare-part.entity';

@Entity('spare_part_request_items')
export class SparePartRequestItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'request_id' })
  requestId: number;

  @ManyToOne(() => SparePartRequest, (request) => request.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'request_id' })
  request: SparePartRequest;

  @Column({ name: 'spare_part_id' })
  sparePartId: number;

  @ManyToOne(() => SparePart)
  @JoinColumn({ name: 'spare_part_id' })
  sparePart: SparePart;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  quantity: number;
}
