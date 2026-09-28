import { PartialType } from '@nestjs/mapped-types';
import { CreateStationExpenseDto } from './create-station-expense.dto';

export class UpdateStationExpenseDto extends PartialType(CreateStationExpenseDto) {}
