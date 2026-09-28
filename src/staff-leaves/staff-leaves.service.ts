import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual, LessThanOrEqual, FindOptionsWhere } from 'typeorm';
import { StaffLeave } from '../entities/staff-leave.entity';

export interface FindStaffLeavesQuery {
  staffId?: number;
  startDate?: string;
  endDate?: string;
}

@Injectable()
export class StaffLeavesService {
  constructor(
    @InjectRepository(StaffLeave)
    private staffLeaveRepository: Repository<StaffLeave>,
  ) {}

  async findAll(query: FindStaffLeavesQuery): Promise<StaffLeave[]> {
    const where: FindOptionsWhere<StaffLeave> = {};
    if (query.staffId) {
      where.staff_id = query.staffId;
    }
    if (query.startDate) {
      where.end_date = MoreThanOrEqual(new Date(`${query.startDate}T00:00:00`));
    }
    if (query.endDate) {
      where.start_date = LessThanOrEqual(new Date(`${query.endDate}T23:59:59.999`));
    }
    return this.staffLeaveRepository.find({
      where,
      order: { start_date: 'DESC' },
    });
  }
}
