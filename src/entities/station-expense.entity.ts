import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Station } from './station.entity';
import { Staff } from './staff.entity';

// MySQL returns DECIMAL as a string; parse so callers get numbers.
const decimal = {
  to: (value: number) => value,
  from: (value: string | null) => (value === null ? 0 : parseFloat(value)),
};

@Entity('station_expenses')
export class StationExpense {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  // Staff member who recorded the expense.
  @Column({ name: 'user_id', type: 'int', unsigned: true })
  user_id: number;

  @ManyToOne(() => Staff)
  @JoinColumn({ name: 'user_id' })
  user?: Staff;

  @Column({ name: 'station_id', type: 'int', unsigned: true })
  station_id: number;

  @ManyToOne(() => Station)
  @JoinColumn({ name: 'station_id' })
  station?: Station;

  @Column({ type: 'decimal', precision: 14, scale: 2, transformer: decimal })
  amount: number;

  @Column({ name: 'expense_date', type: 'date' })
  expense_date: string;

  @Column({ type: 'text' })
  comment: string;

  @Column({ name: 'payment_method', type: 'varchar', length: 32 })
  payment_method: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
}
