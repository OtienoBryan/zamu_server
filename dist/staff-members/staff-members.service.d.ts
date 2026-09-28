import { Repository } from 'typeorm';
import { StaffMember } from '../entities/staff-member.entity';
import { CreateStaffMemberDto } from './dto/create-staff-member.dto';
import { UpdateStaffMemberDto } from './dto/update-staff-member.dto';
export declare class StaffMembersService {
    private staffMemberRepository;
    constructor(staffMemberRepository: Repository<StaffMember>);
    findAll(): Promise<StaffMember[]>;
    findOne(id: number): Promise<StaffMember>;
    create(dto: CreateStaffMemberDto): Promise<StaffMember>;
    update(id: number, dto: UpdateStaffMemberDto): Promise<StaffMember>;
    remove(id: number): Promise<void>;
}
