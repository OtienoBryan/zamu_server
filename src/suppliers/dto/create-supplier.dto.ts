import { IsString, IsNotEmpty, IsOptional, IsEmail, IsInt, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSupplierDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  mobileNumber?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  paymentTermsDays?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  creditLimit?: number;

  @IsOptional()
  @IsString()
  taxPin?: string;
}
