import { Repository } from 'typeorm';
import { StaffMemberLeave } from '../entities/staff-member-leave.entity';
import { StaffMember } from '../entities/staff-member.entity';
import { CreateStaffLeaveDto } from './dto/create-staff-leave.dto';
import { DecideStaffLeaveDto } from './dto/decide-staff-leave.dto';
export declare class StaffMemberLeavesService {
    private leaveRepository;
    private staffMemberRepository;
    constructor(leaveRepository: Repository<StaffMemberLeave>, staffMemberRepository: Repository<StaffMember>);
    findAll(): Promise<StaffMemberLeave[]>;
    create(dto: CreateStaffLeaveDto): Promise<StaffMemberLeave>;
    decide(id: number, dto: DecideStaffLeaveDto): Promise<StaffMemberLeave>;
    remove(id: number): Promise<void>;
}
