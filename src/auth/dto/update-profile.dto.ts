import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  phoneNumber?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Please provide a valid email address' })
  businessEmail?: string;
}
