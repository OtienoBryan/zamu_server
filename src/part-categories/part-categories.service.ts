import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PartCategory } from '../entities/part-category.entity';

@Injectable()
export class PartCategoriesService {
  constructor(
    @InjectRepository(PartCategory)
    private repo: Repository<PartCategory>,
  ) {}

  findAll(): Promise<PartCategory[]> {
    return this.repo.find({ order: { name: 'ASC' } });
  }

  async findOne(id: number): Promise<PartCategory> {
    const cat = await this.repo.findOne({ where: { id } });
    if (!cat) throw new NotFoundException(`Part category ${id} not found`);
    return cat;
  }

  create(data: Partial<PartCategory>): Promise<PartCategory> {
    return this.repo.save(this.repo.create(data));
  }

  async update(id: number, data: Partial<PartCategory>): Promise<PartCategory> {
    const cat = await this.findOne(id);
    Object.assign(cat, data);
    return this.repo.save(cat);
  }

  async remove(id: number): Promise<void> {
    const cat = await this.findOne(id);
    await this.repo.remove(cat);
  }
}
