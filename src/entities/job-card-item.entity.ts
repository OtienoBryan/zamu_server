import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { JobCard } from './job-card.entity';
import { Part } from './part.entity';
import { Service } from './service.entity';
import { Staff } from './staff.entity';

@Entity('job_card_items')
export class JobCardItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'job_card_id', type: 'int' })
  job_card_id: number;

  @ManyToOne(() => JobCard, jobCard => jobCard.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'job_card_id' })
  jobCard?: JobCard;

  @Column({ type: 'enum', enum: ['part', 'labor'] })
  item_type: 'part' | 'labor';

  @Column({ name: 'part_id', type: 'int', nullable: true })
  part_id?: number | null;

  @ManyToOne(() => Part)
  @JoinColumn({ name: 'part_id' })
  part?: Part;

  @Column({ name: 'service_id', type: 'int', nullable: true })
  service_id?: number | null;

  @ManyToOne(() => Service)
  @JoinColumn({ name: 'service_id' })
  service?: Service;

  @Column({ name: 'assigned_staff_id', type: 'int', nullable: true })
  assigned_staff_id?: number | null;

  @ManyToOne(() => Staff)
  @JoinColumn({ name: 'assigned_staff_id' })
  assignedStaff?: Staff;

  @Column({ type: 'datetime', nullable: true })
  assigned_at?: Date | null;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0, transformer: {
    to: (value: number) => value,
    from: (value: string) => value != null ? parseFloat(value) : 0
  }})
  cost: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0, transformer: {
    to: (value: number) => value,
    from: (value: string) => parseFloat(value)
  }})
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 1, transformer: {
    to: (value: number) => value,
    from: (value: string) => parseFloat(value)
  }})
  quantity: number;

  @Column({ type: 'int', default: 1 })
  taxable: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0, transformer: {
    to: (value: number) => value,
    from: (value: string) => parseFloat(value)
  }})
  amount: number;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
}
