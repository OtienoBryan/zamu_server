import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { StationTanksService } from './station-tanks.service';
import { StationTank } from '../entities/station-tank.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateStationTankDto } from './dto/create-station-tank.dto';
import { UpdateStationTankDto } from './dto/update-station-tank.dto';

@Controller('station-tanks')
@UseGuards(JwtAuthGuard)
export class StationTanksController {
  constructor(private readonly stationTanksService: StationTanksService) {}

  @Get()
  async findAll(@Query('stationId') stationId?: string): Promise<StationTank[]> {
    return this.stationTanksService.findAll(stationId ? Number(stationId) : undefined);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<StationTank> {
    return this.stationTanksService.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreateStationTankDto): Promise<StationTank> {
    return this.stationTanksService.create(dto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateStationTankDto,
  ): Promise<StationTank> {
    return this.stationTanksService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.stationTanksService.remove(id);
    return { message: 'Tank deleted successfully' };
  }
}
