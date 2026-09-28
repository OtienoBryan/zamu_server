import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ServicesCatalogService } from './services-catalog.service';
import { Service } from '../entities/service.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Controller('services')
@UseGuards(JwtAuthGuard)
export class ServicesCatalogController {
  constructor(private readonly servicesCatalogService: ServicesCatalogService) {}

  @Get()
  async findAll(): Promise<Service[]> {
    return this.servicesCatalogService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Service> {
    return this.servicesCatalogService.findOne(id);
  }

  @Post()
  async create(@Body() createServiceDto: CreateServiceDto): Promise<Service> {
    return this.servicesCatalogService.create(createServiceDto);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateServiceDto: UpdateServiceDto): Promise<Service> {
    return this.servicesCatalogService.update(id, updateServiceDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.servicesCatalogService.remove(id);
    return { message: 'Service deleted successfully' };
  }
}
