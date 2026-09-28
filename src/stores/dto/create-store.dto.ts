import { IsString, IsNotEmpty, IsOptional, IsInt, IsBoolean } from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class CreateStoreDto {
  @IsOptional()
  @Transform(({ value }) => value === '' ? undefined : value)
  @IsString()
  store_code?: string;

  @IsString()
  @IsNotEmpty()
  store_name: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsInt()
  @Type(() => Number)
  country_id: number;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  is_active?: boolean;
}

