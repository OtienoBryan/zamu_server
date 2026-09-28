import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SalesPosting } from '../entities/sales-posting.entity';
import { CreateSalesPostingDto } from './dto/create-sales-posting.dto';

export interface FindSalesPostingsQuery {
  stationId?: number;
}

@Injectable()
export class SalesPostingsService {
  constructor(
    @InjectRepository(SalesPosting)
    private salesPostingRepository: Repository<SalesPosting>,
  ) {}

  async findAll(query: FindSalesPostingsQuery): Promise<SalesPosting[]> {
    const where: Record<string, unknown> = {};
    if (query.stationId) {
      where.station_id = query.stationId;
    }
    return this.salesPostingRepository.find({
      where,
      order: { created_at: 'DESC' },
    });
  }

  async create(dto: CreateSalesPostingDto, postedBy: number | null): Promise<SalesPosting> {
    const posting = this.salesPostingRepository.create({
      ...dto,
      posted_by: postedBy,
    });
    return this.salesPostingRepository.save(posting);
  }

  async update(id: number, dto: CreateSalesPostingDto, postedBy: number | null): Promise<SalesPosting> {
    await this.salesPostingRepository.update(id, { ...dto, posted_by: postedBy });
    return this.salesPostingRepository.findOneByOrFail({ id });
  }
}
