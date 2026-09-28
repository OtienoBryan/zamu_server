import { StaffMembersService } from './staff-members.service';
import { StaffMember } from '../entities/staff-member.entity';
import { CreateStaffMemberDto } from './dto/create-staff-member.dto';
import { UpdateStaffMemberDto } from './dto/update-staff-member.dto';
export declare class StaffMembersController {
    private readonly staffMembersService;
    constructor(staffMembersService: StaffMembersService);
    findAll(): Promise<StaffMember[]>;
    findOne(id: number): Promise<StaffMember>;
    create(dto: CreateStaffMemberDto): Promise<StaffMember>;
    update(id: number, dto: UpdateStaffMemberDto): Promise<StaffMember>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
