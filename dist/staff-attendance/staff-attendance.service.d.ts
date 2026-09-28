import { Repository } from 'typeorm';
import { StaffAttendance } from '../entities/staff-attendance.entity';
import { StaffMember } from '../entities/staff-member.entity';
import { CheckInDto } from './dto/check-in.dto';
import { CheckOutDto } from './dto/check-out.dto';
export declare class StaffAttendanceService {
    private attendanceRepository;
    private staffMemberRepository;
    constructor(attendanceRepository: Repository<StaffAttendance>, staffMemberRepository: Repository<StaffMember>);
    findAll(): Promise<StaffAttendance[]>;
    checkIn(dto: CheckInDto): Promise<StaffAttendance>;
    checkOut(id: number, dto: CheckOutDto): Promise<StaffAttendance>;
    remove(id: number): Promise<void>;
}
