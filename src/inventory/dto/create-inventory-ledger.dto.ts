import { IsInt, IsNotEmpty, IsOptional, IsString, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { TransactionType } from './inventory-transaction.dto';

export class CreateInventoryLedgerDto {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  inventory_id: number;

  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  store_id: number;

  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  part_id: number;

  @IsEnum(TransactionType)
  transactionType: TransactionType;

  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  quantity: number;

  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  previous_quantity: number;

  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  new_quantity: number;

  @IsOptional()
  @IsString()
  reference_number?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  created_by?: number;
}
