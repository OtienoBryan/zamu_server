import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('account_category')
export class AccountCategory {
  @PrimaryColumn()
  id: number;

  @Column({ type: 'varchar', length: 20 })
  name: string;
}
