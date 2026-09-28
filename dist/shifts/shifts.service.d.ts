import { Repository } from 'typeorm';
import { Shift } from '../entities/shift.entity';
export interface FindShiftsQuery {
    stationId?: number;
    startDate?: string;
    endDate?: string;
}
export declare class ShiftsService {
    private shiftRepository;
    constructor(shiftRepository: Repository<Shift>);
    findAll(query: FindShiftsQuery): Promise<Shift[]>;
}
