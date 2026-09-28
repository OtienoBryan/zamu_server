import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('KeyAccounts')
export class KeyAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 50 })
  contact: string;

  @Column({ type: 'varchar', length: 100, unique: true, nullable: true })
  account_number: string | null;

  @Column({ type: 'enum', enum: ['client', 'key_account'], default: 'key_account' })
  type: 'client' | 'key_account';

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'varchar', length: 191, nullable: true })
  region: string | null;

  @Column({ type: 'int', default: 1 })
  is_active: number;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}

