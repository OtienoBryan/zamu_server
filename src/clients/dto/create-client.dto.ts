import { IsString, IsNotEmpty, IsOptional, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  contact?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  creditTermsDays?: number;
}
