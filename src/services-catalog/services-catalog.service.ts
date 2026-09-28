import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from '../entities/service.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesCatalogService {
  constructor(
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
  ) {}

  async findAll(): Promise<Service[]> {
    return this.serviceRepository.find({ order: { title: 'ASC' } });
  }

  async findOne(id: number): Promise<Service> {
    const service = await this.serviceRepository.findOne({ where: { id } });

    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }

    return service;
  }

  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    const service = this.serviceRepository.create({
      title: createServiceDto.title,
      description: createServiceDto.description || null,
      rate: createServiceDto.rate,
      pricing_type: createServiceDto.pricing_type,
      is_active: createServiceDto.is_active !== undefined ? createServiceDto.is_active : 1,
    });

    return this.serviceRepository.save(service);
  }

  async update(id: number, updateServiceDto: UpdateServiceDto): Promise<Service> {
    const service = await this.findOne(id);
    Object.assign(service, updateServiceDto);
    return this.serviceRepository.save(service);
  }

  async remove(id: number): Promise<void> {
    const service = await this.findOne(id);
    await this.serviceRepository.remove(service);
  }
}
