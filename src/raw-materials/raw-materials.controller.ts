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
import { RawMaterialsService } from './raw-materials.service';
import { RawMaterial } from '../entities/raw-material.entity';
import { RawMaterialCategory } from '../entities/raw-material-category.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateRawMaterialDto } from './dto/create-raw-material.dto';
import { UpdateRawMaterialDto } from './dto/update-raw-material.dto';

@Controller('raw-materials')
@UseGuards(JwtAuthGuard)
export class RawMaterialsController {
  constructor(private readonly rawMaterialsService: RawMaterialsService) {}

  // Static routes must come before ':id' so "categories" isn't parsed as an id
  @Get('categories')
  async findAllCategories(): Promise<RawMaterialCategory[]> {
    return this.rawMaterialsService.findAllCategories();
  }

  @Post('categories')
  async createCategory(@Body('name') name: string): Promise<RawMaterialCategory> {
    return this.rawMaterialsService.createCategory(name);
  }

  @Put('categories/:id')
  async updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body('name') name: string,
  ): Promise<RawMaterialCategory> {
    return this.rawMaterialsService.updateCategory(id, name);
  }

  @Delete('categories/:id')
  async removeCategory(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.rawMaterialsService.removeCategory(id);
    return { message: 'Category deleted successfully' };
  }

  @Get()
  async findAll(): Promise<RawMaterial[]> {
    return this.rawMaterialsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<RawMaterial> {
    return this.rawMaterialsService.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreateRawMaterialDto): Promise<RawMaterial> {
    return this.rawMaterialsService.create(dto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRawMaterialDto,
  ): Promise<RawMaterial> {
    return this.rawMaterialsService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.rawMaterialsService.remove(id);
    return { message: 'Raw material deleted successfully' };
  }
}
