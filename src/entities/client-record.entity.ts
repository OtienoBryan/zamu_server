import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('clients')
export class ClientRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  contact: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  address: string | null;

  // Number of days the client has to pay after an invoice/sale (e.g. 30 = Net 30). Null/0 = cash.
  @Column({ name: 'credit_terms_days', type: 'int', nullable: true })
  creditTermsDays: number | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
