import { IsString, IsNotEmpty, IsInt, IsOptional, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateChartOfAccountDto {
  @IsString()
  @IsNotEmpty()
  accountName: string;

  @IsString()
  @IsNotEmpty()
  accountCode: string;

  @IsInt()
  @Type(() => Number)
  parentAccountId: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isActive?: boolean;
}
