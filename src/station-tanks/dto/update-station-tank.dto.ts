import { PartialType } from '@nestjs/mapped-types';
import { CreateStationTankDto } from './create-station-tank.dto';

export class UpdateStationTankDto extends PartialType(CreateStationTankDto) {}
