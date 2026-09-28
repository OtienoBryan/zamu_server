import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from '../entities/job.entity';
import { FinishedProduct } from '../entities/finished-product.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
    @InjectRepository(FinishedProduct)
    private productRepository: Repository<FinishedProduct>,
  ) {}

  async findAll(): Promise<Job[]> {
    return this.jobRepository.find({ relations: ['product'], order: { createdAt: 'DESC' } });
  }

  async findOne(id: number): Promise<Job> {
    const job = await this.jobRepository.findOne({ where: { id }, relations: ['product'] });
    if (!job) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }
    return job;
  }

  async create(dto: CreateJobDto): Promise<Job> {
    await this.ensureProductExists(dto.productId);
    this.ensureDateOrder(dto.startDate, dto.expectedEndDate);

    const job = this.jobRepository.create({
      productId: dto.productId,
      quantity: dto.quantity,
      startDate: dto.startDate,
      expectedEndDate: dto.expectedEndDate,
      notes: dto.notes ?? null,
      status: dto.status ?? 'open',
    });
    const saved = await this.jobRepository.save(job);
    return this.findOne(saved.id);
  }

  async update(id: number, dto: UpdateJobDto): Promise<Job> {
    const job = await this.findOne(id);
    if (dto.productId != null) {
      await this.ensureProductExists(dto.productId);
    }
    this.ensureDateOrder(dto.startDate ?? job.startDate ?? undefined, dto.expectedEndDate ?? job.expectedEndDate ?? undefined);

    Object.assign(job, dto);
    await this.jobRepository.save(job);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const job = await this.findOne(id);
    await this.jobRepository.remove(job);
  }

  private async ensureProductExists(productId: number): Promise<void> {
    const product = await this.productRepository.findOne({ where: { id: productId } });
    if (!product) {
      throw new NotFoundException(`Finished product with ID ${productId} not found`);
    }
  }

  private ensureDateOrder(startDate?: string, expectedEndDate?: string): void {
    if (!startDate || !expectedEndDate) return;
    if (new Date(expectedEndDate) < new Date(startDate)) {
      throw new BadRequestException('Expected end date must be on or after the start date');
    }
  }
}
