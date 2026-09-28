import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { StaffAttendanceService } from './staff-attendance.service';
import { StaffAttendance } from '../entities/staff-attendance.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CheckInDto } from './dto/check-in.dto';
import { CheckOutDto } from './dto/check-out.dto';

@Controller('staff-attendance')
@UseGuards(JwtAuthGuard)
export class StaffAttendanceController {
  constructor(private readonly staffAttendanceService: StaffAttendanceService) {}

  @Get()
  async findAll(): Promise<StaffAttendance[]> {
    return this.staffAttendanceService.findAll();
  }

  @Post()
  async checkIn(@Body() dto: CheckInDto): Promise<StaffAttendance> {
    return this.staffAttendanceService.checkIn(dto);
  }

  @Put(':id/checkout')
  async checkOut(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CheckOutDto,
  ): Promise<StaffAttendance> {
    return this.staffAttendanceService.checkOut(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.staffAttendanceService.remove(id);
    return { message: 'Attendance record deleted successfully' };
  }
}
