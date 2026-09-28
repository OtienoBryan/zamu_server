import { Repository } from 'typeorm';
import { StaffLeave } from '../entities/staff-leave.entity';
export interface FindStaffLeavesQuery {
    staffId?: number;
    startDate?: string;
    endDate?: string;
}
export declare class StaffLeavesService {
    private staffLeaveRepository;
    constructor(staffLeaveRepository: Repository<StaffLeave>);
    findAll(query: FindStaffLeavesQuery): Promise<StaffLeave[]>;
}
