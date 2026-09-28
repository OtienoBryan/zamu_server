import { StaffLeavesService } from './staff-leaves.service';
import { StaffLeave } from '../entities/staff-leave.entity';
export declare class StaffLeavesController {
    private readonly staffLeavesService;
    constructor(staffLeavesService: StaffLeavesService);
    findAll(staffId?: string, startDate?: string, endDate?: string): Promise<StaffLeave[]>;
}
