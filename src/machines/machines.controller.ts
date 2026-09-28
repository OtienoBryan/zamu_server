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
import { MachinesService } from './machines.service';
import { Machine } from '../entities/machine.entity';
import { MachineCategory } from '../entities/machine-category.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateMachineDto } from './dto/update-machine.dto';

@Controller('machines')
@UseGuards(JwtAuthGuard)
export class MachinesController {
  constructor(private readonly machinesService: MachinesService) {}

  // Static routes must come before ':id' so "categories" isn't parsed as an id
  @Get('categories')
  async findAllCategories(): Promise<MachineCategory[]> {
    return this.machinesService.findAllCategories();
  }

  @Post('categories')
  async createCategory(@Body('name') name: string): Promise<MachineCategory> {
    return this.machinesService.createCategory(name);
  }

  @Put('categories/:id')
  async updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body('name') name: string,
  ): Promise<MachineCategory> {
    return this.machinesService.updateCategory(id, name);
  }

  @Delete('categories/:id')
  async removeCategory(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.machinesService.removeCategory(id);
    return { message: 'Category deleted successfully' };
  }

  @Get()
  async findAll(): Promise<Machine[]> {
    return this.machinesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Machine> {
    return this.machinesService.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreateMachineDto): Promise<Machine> {
    return this.machinesService.create(dto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateMachineDto,
  ): Promise<Machine> {
    return this.machinesService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.machinesService.remove(id);
    return { message: 'Machine deleted successfully' };
  }
}
