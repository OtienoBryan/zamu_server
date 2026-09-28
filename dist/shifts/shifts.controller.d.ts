import { ShiftsService } from './shifts.service';
import { Shift } from '../entities/shift.entity';
export declare class ShiftsController {
    private readonly shiftsService;
    constructor(shiftsService: ShiftsService);
    findAll(stationId?: string, startDate?: string, endDate?: string): Promise<Shift[]>;
}
