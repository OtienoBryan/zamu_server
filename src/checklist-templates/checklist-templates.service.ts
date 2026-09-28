import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChecklistTemplate } from '../entities/checklist-template.entity';
import { CreateChecklistTemplateDto } from './dto/create-checklist-template.dto';
import { UpdateChecklistTemplateDto } from './dto/update-checklist-template.dto';

@Injectable()
export class ChecklistTemplatesService {
  constructor(
    @InjectRepository(ChecklistTemplate)
    private templateRepository: Repository<ChecklistTemplate>,
  ) {}

  async findAll(): Promise<ChecklistTemplate[]> {
    return this.templateRepository.find({ order: { updated_at: 'DESC' } });
  }

  async findOne(id: number): Promise<ChecklistTemplate> {
    const template = await this.templateRepository.findOne({ where: { id } });

    if (!template) {
      throw new NotFoundException(`Checklist template with ID ${id} not found`);
    }

    return template;
  }

  async create(dto: CreateChecklistTemplateDto): Promise<ChecklistTemplate> {
    const template = this.templateRepository.create({
      title: dto.title,
      checklist: dto.checklist ?? null,
    });

    return this.templateRepository.save(template);
  }

  async update(id: number, dto: UpdateChecklistTemplateDto): Promise<ChecklistTemplate> {
    const template = await this.findOne(id);
    Object.assign(template, dto);
    return this.templateRepository.save(template);
  }

  async remove(id: number): Promise<void> {
    const template = await this.findOne(id);
    await this.templateRepository.remove(template);
  }
}
