import { StaffAttendanceService } from './staff-attendance.service';
import { StaffAttendance } from '../entities/staff-attendance.entity';
import { CheckInDto } from './dto/check-in.dto';
import { CheckOutDto } from './dto/check-out.dto';
export declare class StaffAttendanceController {
    private readonly staffAttendanceService;
    constructor(staffAttendanceService: StaffAttendanceService);
    findAll(): Promise<StaffAttendance[]>;
    checkIn(dto: CheckInDto): Promise<StaffAttendance>;
    checkOut(id: number, dto: CheckOutDto): Promise<StaffAttendance>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
