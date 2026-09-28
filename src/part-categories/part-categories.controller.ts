import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { PartCategoriesService } from './part-categories.service';
import { PartCategory } from '../entities/part-category.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('part-categories')
@UseGuards(JwtAuthGuard)
export class PartCategoriesController {
  constructor(private readonly service: PartCategoriesService) {}

  @Get()
  findAll(): Promise<PartCategory[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<PartCategory> {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() body: Partial<PartCategory>): Promise<PartCategory> {
    return this.service.create(body);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: Partial<PartCategory>,
  ): Promise<PartCategory> {
    return this.service.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.service.remove(id);
    return { message: 'Category deleted' };
  }
}
