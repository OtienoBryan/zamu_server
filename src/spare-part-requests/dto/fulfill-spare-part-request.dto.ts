import { IsOptional, IsDateString, IsString } from 'class-validator';

export class FulfillSparePartRequestDto {
  @IsOptional()
  @IsDateString()
  fulfilledAt?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
