import { IsInt, IsNotEmpty, IsOptional, IsString, IsEnum, Min } from 'class-validator';
import { Type } from 'class-transformer';

export enum TransactionType {
  IN = 'IN',
  OUT = 'OUT',
  ADJUSTMENT = 'ADJUSTMENT',
  TRANSFER_IN = 'TRANSFER_IN',
  TRANSFER_OUT = 'TRANSFER_OUT'
}

export class InventoryTransactionDto {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  store_id: number;

  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  part_id: number;

  @IsEnum(TransactionType)
  transaction_type: TransactionType;

  @IsInt()
  @Type(() => Number)
  @Min(1)
  quantity: number;

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

