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
import { SparePartsService } from './spare-parts.service';
import { SparePart } from '../entities/spare-part.entity';
import { SparePartCategory } from '../entities/spare-part-category.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateSparePartDto } from './dto/create-spare-part.dto';
import { UpdateSparePartDto } from './dto/update-spare-part.dto';

@Controller('spare-parts')
@UseGuards(JwtAuthGuard)
export class SparePartsController {
  constructor(private readonly sparePartsService: SparePartsService) {}

  // Static routes must come before ':id' so "categories" isn't parsed as an id
  @Get('categories')
  async findAllCategories(): Promise<SparePartCategory[]> {
    return this.sparePartsService.findAllCategories();
  }

  @Post('categories')
  async createCategory(@Body('name') name: string): Promise<SparePartCategory> {
    return this.sparePartsService.createCategory(name);
  }

  @Put('categories/:id')
  async updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body('name') name: string,
  ): Promise<SparePartCategory> {
    return this.sparePartsService.updateCategory(id, name);
  }

  @Delete('categories/:id')
  async removeCategory(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.sparePartsService.removeCategory(id);
    return { message: 'Category deleted successfully' };
  }

  @Get()
  async findAll(): Promise<SparePart[]> {
    return this.sparePartsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<SparePart> {
    return this.sparePartsService.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreateSparePartDto): Promise<SparePart> {
    return this.sparePartsService.create(dto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSparePartDto,
  ): Promise<SparePart> {
    return this.sparePartsService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.sparePartsService.remove(id);
    return { message: 'Spare part deleted successfully' };
  }
}
