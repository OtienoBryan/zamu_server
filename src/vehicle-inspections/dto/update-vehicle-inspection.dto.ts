import { PartialType } from '@nestjs/mapped-types';
import { CreateVehicleInspectionDto } from './create-vehicle-inspection.dto';

export class UpdateVehicleInspectionDto extends PartialType(CreateVehicleInspectionDto) {}
