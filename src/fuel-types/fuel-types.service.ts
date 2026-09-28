import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FuelType } from '../entities/fuel-type.entity';

@Injectable()
export class FuelTypesService {
  constructor(
    @InjectRepository(FuelType) private repo: Repository<FuelType>,
  ) {}

  findAll(): Promise<FuelType[]> {
    return this.repo.find({ order: { name: 'ASC' } });
  }

  async findOne(id: number): Promise<FuelType> {
    const fuelType = await this.repo.findOne({ where: { id } });
    if (!fuelType) throw new NotFoundException(`Fuel type ${id} not found`);
    return fuelType;
  }

  create(data: Partial<FuelType>): Promise<FuelType> {
    return this.repo.save(this.repo.create(data));
  }

  async update(id: number, data: Partial<FuelType>): Promise<FuelType> {
    const fuelType = await this.findOne(id);
    Object.assign(fuelType, data);
    return this.repo.save(fuelType);
  }

  async remove(id: number): Promise<void> {
    const fuelType = await this.findOne(id);
    await this.repo.remove(fuelType);
  }
}
