import { PartialType } from '@nestjs/mapped-types';
import { CreateInventoryLedgerDto } from './create-inventory-ledger.dto';
import { IsOptional, IsEnum } from 'class-validator';
import { TransactionType } from './inventory-transaction.dto';

export class UpdateInventoryLedgerDto extends PartialType(CreateInventoryLedgerDto) {
  @IsOptional()
  @IsEnum(TransactionType)
  transactionType?: TransactionType;
}
