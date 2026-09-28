import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { FuelTypesService } from './fuel-types.service';
import { FuelType } from '../entities/fuel-type.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('fuel-types')
@UseGuards(JwtAuthGuard)
export class FuelTypesController {
  constructor(private readonly service: FuelTypesService) {}

  @Get()
  findAll(): Promise<FuelType[]> { return this.service.findAll(); }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<FuelType> { return this.service.findOne(id); }

  @Post()
  create(@Body() body: Partial<FuelType>): Promise<FuelType> { return this.service.create(body); }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: Partial<FuelType>): Promise<FuelType> {
    return this.service.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.service.remove(id);
    return { message: 'Fuel type deleted' };
  }
}
