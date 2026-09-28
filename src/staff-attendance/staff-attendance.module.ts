import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffAttendanceService } from './staff-attendance.service';
import { StaffAttendanceController } from './staff-attendance.controller';
import { StaffAttendance } from '../entities/staff-attendance.entity';
import { StaffMember } from '../entities/staff-member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StaffAttendance, StaffMember])],
  controllers: [StaffAttendanceController],
  providers: [StaffAttendanceService],
  exports: [StaffAttendanceService],
})
export class StaffAttendanceModule {}
