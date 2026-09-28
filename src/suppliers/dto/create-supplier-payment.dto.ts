import { IsInt, IsNumber, IsPositive, IsDateString, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSupplierPaymentDto {
  @IsInt()
  @Type(() => Number)
  paymentAccountId: number;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  amount: number;

  @IsDateString()
  paymentDate: string;

  @IsOptional()
  @IsString()
  notes?: string;

  // Which open invoice (purchase order) this payment is recorded against, for
  // traceability — the balance itself is still one running account (see
  // suppliers.service.ts), consumed FIFO on read, same as any payment.
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  purchaseOrderId?: number;
}
