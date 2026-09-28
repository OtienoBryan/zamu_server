import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { RawMaterialStore } from './raw-material-store.entity';
import { SparePartRequestItem } from './spare-part-request-item.entity';
import { Machine } from './machine.entity';
import { StaffMember } from './staff-member.entity';

export type SparePartRequestStatus = 'pending' | 'fulfilled' | 'cancelled';

@Entity('spare_part_requests')
export class SparePartRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'store_id' })
  storeId: number;

  @ManyToOne(() => RawMaterialStore)
  @JoinColumn({ name: 'store_id' })
  store: RawMaterialStore;

  // Which machine these parts are for — optional, since not every request is
  // tied to a specific machine (e.g. general workshop stock).
  @Column({ name: 'machine_id', nullable: true })
  machineId: number | null;

  @ManyToOne(() => Machine)
  @JoinColumn({ name: 'machine_id' })
  machine: Machine | null;

  // The staff member making the request — distinct from `requestedBy`, which
  // is the logged-in admin/user account that submitted it.
  @Column({ name: 'staff_member_id', nullable: true })
  staffMemberId: number | null;

  @ManyToOne(() => StaffMember)
  @JoinColumn({ name: 'staff_member_id' })
  staffMember: StaffMember | null;

  @Column({ type: 'enum', enum: ['pending', 'fulfilled', 'cancelled'], default: 'pending' })
  status: SparePartRequestStatus;

  @Column({ name: 'requested_by', type: 'int', nullable: true })
  requestedBy: number | null;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @Column({ name: 'fulfilled_at', type: 'timestamp', nullable: true })
  fulfilledAt: Date | null;

  @Column({ name: 'fulfillment_notes', type: 'text', nullable: true })
  fulfillmentNotes: string | null;

  @OneToMany(() => SparePartRequestItem, (item) => item.request, { cascade: true })
  items: SparePartRequestItem[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
