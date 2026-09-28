import { StaffMemberLeavesService } from './staff-member-leaves.service';
import { StaffMemberLeave } from '../entities/staff-member-leave.entity';
import { CreateStaffLeaveDto } from './dto/create-staff-leave.dto';
import { DecideStaffLeaveDto } from './dto/decide-staff-leave.dto';
export declare class StaffMemberLeavesController {
    private readonly staffMemberLeavesService;
    constructor(staffMemberLeavesService: StaffMemberLeavesService);
    findAll(): Promise<StaffMemberLeave[]>;
    create(dto: CreateStaffLeaveDto): Promise<StaffMemberLeave>;
    decide(id: number, dto: DecideStaffLeaveDto): Promise<StaffMemberLeave>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
