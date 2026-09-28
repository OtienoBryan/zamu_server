import { PartialType } from '@nestjs/mapped-types';
import { CreateConversionVehicleDto } from './create-conversion-vehicle.dto';

export class UpdateConversionVehicleDto extends PartialType(CreateConversionVehicleDto) {}
