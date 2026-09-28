import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { StaffLeavesService } from './staff-leaves.service';
import { StaffLeave } from '../entities/staff-leave.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('staff-leaves')
@UseGuards(JwtAuthGuard)
export class StaffLeavesController {
  constructor(private readonly staffLeavesService: StaffLeavesService) {}

  @Get()
  async findAll(
    @Query('staffId') staffId?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ): Promise<StaffLeave[]> {
    return this.staffLeavesService.findAll({
      staffId: staffId ? parseInt(staffId, 10) : undefined,
      startDate,
      endDate,
    });
  }
}
