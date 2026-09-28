import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductionStage } from '../entities/production-stage.entity';
import { CreateProductionStageDto } from './dto/create-production-stage.dto';
import { UpdateProductionStageDto } from './dto/update-production-stage.dto';

@Injectable()
export class ProductionStagesService {
  constructor(
    @InjectRepository(ProductionStage)
    private stageRepository: Repository<ProductionStage>,
  ) {}

  async findAll(): Promise<ProductionStage[]> {
    return this.stageRepository.find({ order: { sequenceOrder: 'ASC', id: 'ASC' } });
  }

  async findOne(id: number): Promise<ProductionStage> {
    const stage = await this.stageRepository.findOne({ where: { id } });
    if (!stage) {
      throw new NotFoundException(`Production stage with ID ${id} not found`);
    }
    return stage;
  }

  async create(dto: CreateProductionStageDto): Promise<ProductionStage> {
    let sequenceOrder = dto.sequenceOrder;
    if (sequenceOrder == null) {
      // Default to the end of the pipeline so a newly added stage doesn't
      // jump ahead of existing ones by accident.
      const last = await this.stageRepository.find({ order: { sequenceOrder: 'DESC' }, take: 1 });
      sequenceOrder = last.length ? last[0].sequenceOrder + 1 : 1;
    }
    const stage = this.stageRepository.create({
      name: dto.name,
      description: dto.description ?? null,
      sequenceOrder,
      status: dto.status ?? 'active',
    });
    return this.stageRepository.save(stage);
  }

  async update(id: number, dto: UpdateProductionStageDto): Promise<ProductionStage> {
    const stage = await this.findOne(id);
    Object.assign(stage, dto);
    return this.stageRepository.save(stage);
  }

  async remove(id: number): Promise<void> {
    const stage = await this.findOne(id);
    await this.stageRepository.remove(stage);
  }
}
