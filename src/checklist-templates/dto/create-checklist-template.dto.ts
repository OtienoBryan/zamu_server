import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateChecklistTemplateDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  checklist?: string;
}
