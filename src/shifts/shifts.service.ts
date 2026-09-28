import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Shift } from '../entities/shift.entity';

export interface FindShiftsQuery {
  stationId?: number;
  startDate?: string;
  endDate?: string;
}

@Injectable()
export class ShiftsService {
  constructor(
    @InjectRepository(Shift)
    private shiftRepository: Repository<Shift>,
  ) {}

  async findAll(query: FindShiftsQuery): Promise<Shift[]> {
    const where: Record<string, unknown> = {};

    if (query.stationId) {
      where.station_id = query.stationId;
    }

    if (query.startDate && query.endDate) {
      where.date = Between(new Date(`${query.startDate}T00:00:00`), new Date(`${query.endDate}T23:59:59.999`));
    }

    return this.shiftRepository.find({
      where,
      order: { date: 'DESC', id: 'DESC' },
    });
  }
}
