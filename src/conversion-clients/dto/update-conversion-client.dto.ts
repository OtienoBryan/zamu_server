import { PartialType } from '@nestjs/mapped-types';
import { CreateConversionClientDto } from './create-conversion-client.dto';

export class UpdateConversionClientDto extends PartialType(CreateConversionClientDto) {}
