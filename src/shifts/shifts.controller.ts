import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ShiftsService } from './shifts.service';
import { Shift } from '../entities/shift.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('shifts')
@UseGuards(JwtAuthGuard)
export class ShiftsController {
  constructor(private readonly shiftsService: ShiftsService) {}

  @Get()
  async findAll(
    @Query('stationId') stationId?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ): Promise<Shift[]> {
    return this.shiftsService.findAll({
      stationId: stationId ? parseInt(stationId, 10) : undefined,
      startDate,
      endDate,
    });
  }
}
