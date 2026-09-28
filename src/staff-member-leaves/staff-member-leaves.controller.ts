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
import { StaffMemberLeavesService } from './staff-member-leaves.service';
import { StaffMemberLeave } from '../entities/staff-member-leave.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateStaffLeaveDto } from './dto/create-staff-leave.dto';
import { DecideStaffLeaveDto } from './dto/decide-staff-leave.dto';

@Controller('staff-member-leaves')
@UseGuards(JwtAuthGuard)
export class StaffMemberLeavesController {
  constructor(private readonly staffMemberLeavesService: StaffMemberLeavesService) {}

  @Get()
  async findAll(): Promise<StaffMemberLeave[]> {
    return this.staffMemberLeavesService.findAll();
  }

  @Post()
  async create(@Body() dto: CreateStaffLeaveDto): Promise<StaffMemberLeave> {
    return this.staffMemberLeavesService.create(dto);
  }

  @Put(':id/decision')
  async decide(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: DecideStaffLeaveDto,
  ): Promise<StaffMemberLeave> {
    return this.staffMemberLeavesService.decide(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.staffMemberLeavesService.remove(id);
    return { message: 'Leave record deleted successfully' };
  }
}
