import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { VehicleInspectionsService } from './vehicle-inspections.service';
import { VehicleInspection } from '../entities/vehicle-inspection.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateVehicleInspectionDto } from './dto/create-vehicle-inspection.dto';
import { UpdateVehicleInspectionDto } from './dto/update-vehicle-inspection.dto';

@Controller('vehicle-inspections')
@UseGuards(JwtAuthGuard)
export class VehicleInspectionsController {
  constructor(private readonly vehicleInspectionsService: VehicleInspectionsService) {}

  @Get()
  async findByVehicle(@Query('conversionVehicleId', ParseIntPipe) conversionVehicleId: number): Promise<VehicleInspection[]> {
    return this.vehicleInspectionsService.findByVehicle(conversionVehicleId);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<VehicleInspection> {
    return this.vehicleInspectionsService.findOne(id);
  }

  @Post()
  async create(@Body() createDto: CreateVehicleInspectionDto): Promise<VehicleInspection> {
    return this.vehicleInspectionsService.create(createDto);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateVehicleInspectionDto): Promise<VehicleInspection> {
    return this.vehicleInspectionsService.update(id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.vehicleInspectionsService.remove(id);
    return { message: 'Vehicle inspection deleted successfully' };
  }
}
