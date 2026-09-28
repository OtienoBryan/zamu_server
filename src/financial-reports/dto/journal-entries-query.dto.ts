import { IsOptional, IsDateString, IsInt, IsString, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class JournalEntriesQueryDto {
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  accountId?: number;

  @IsOptional()
  @IsString()
  reference?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(500)
  @Type(() => Number)
  pageSize?: number;
}
