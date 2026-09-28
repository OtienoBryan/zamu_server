import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ChecklistTemplatesService } from './checklist-templates.service';
import { ChecklistTemplate } from '../entities/checklist-template.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateChecklistTemplateDto } from './dto/create-checklist-template.dto';
import { UpdateChecklistTemplateDto } from './dto/update-checklist-template.dto';

@Controller('checklist-templates')
@UseGuards(JwtAuthGuard)
export class ChecklistTemplatesController {
  constructor(private readonly checklistTemplatesService: ChecklistTemplatesService) {}

  @Get()
  async findAll(): Promise<ChecklistTemplate[]> {
    return this.checklistTemplatesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ChecklistTemplate> {
    return this.checklistTemplatesService.findOne(id);
  }

  @Post()
  async create(@Body() createDto: CreateChecklistTemplateDto): Promise<ChecklistTemplate> {
    return this.checklistTemplatesService.create(createDto);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateChecklistTemplateDto): Promise<ChecklistTemplate> {
    return this.checklistTemplatesService.update(id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.checklistTemplatesService.remove(id);
    return { message: 'Checklist template deleted successfully' };
  }
}
