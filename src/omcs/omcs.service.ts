import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Omc } from '../entities/omc.entity';

@Injectable()
export class OmcsService {
  constructor(
    @InjectRepository(Omc) private repo: Repository<Omc>,
  ) {}

  findAll(): Promise<Omc[]> {
    return this.repo.find({ order: { company_name: 'ASC' } });
  }

  async findOne(id: number): Promise<Omc> {
    const omc = await this.repo.findOne({ where: { id } });
    if (!omc) throw new NotFoundException(`OMC ${id} not found`);
    return omc;
  }

  create(data: Partial<Omc>): Promise<Omc> {
    return this.repo.save(this.repo.create(data));
  }

  async update(id: number, data: Partial<Omc>): Promise<Omc> {
    const omc = await this.findOne(id);
    Object.assign(omc, data);
    return this.repo.save(omc);
  }

  async remove(id: number): Promise<void> {
    const omc = await this.findOne(id);
    await this.repo.remove(omc);
  }
}
