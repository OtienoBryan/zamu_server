import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { JobCard } from './job-card.entity';
import { Staff } from './staff.entity';

@Entity('job_card_payments')
export class JobCardPayment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'job_card_id', type: 'int' })
  job_card_id: number;

  @ManyToOne(() => JobCard)
  @JoinColumn({ name: 'job_card_id' })
  jobCard?: JobCard;

  @Column({ type: 'decimal', precision: 12, scale: 2, transformer: {
    to: (value: number) => value,
    from: (value: string) => parseFloat(value)
  }})
  amount: number;

  @Column({ type: 'enum', enum: ['cash', 'mobile_money', 'card', 'bank_transfer', 'cheque', 'other'] })
  payment_method: 'cash' | 'mobile_money' | 'card' | 'bank_transfer' | 'cheque' | 'other';

  @Column({ type: 'varchar', length: 100, nullable: true })
  reference?: string | null;

  @Column({ type: 'date' })
  payment_date: string;

  @Column({ type: 'text', nullable: true })
  notes?: string | null;

  @Column({ name: 'posted_by', type: 'int', nullable: true })
  posted_by?: number | null;

  @ManyToOne(() => Staff)
  @JoinColumn({ name: 'posted_by' })
  postedBy?: Staff;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
}
