import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StaffMemberLeave } from '../entities/staff-member-leave.entity';
import { StaffMember } from '../entities/staff-member.entity';
import { CreateStaffLeaveDto } from './dto/create-staff-leave.dto';
import { DecideStaffLeaveDto } from './dto/decide-staff-leave.dto';

const RELATIONS = ['staffMember'];

@Injectable()
export class StaffMemberLeavesService {
  constructor(
    @InjectRepository(StaffMemberLeave)
    private leaveRepository: Repository<StaffMemberLeave>,
    @InjectRepository(StaffMember)
    private staffMemberRepository: Repository<StaffMember>,
  ) {}

  async findAll(): Promise<StaffMemberLeave[]> {
    return this.leaveRepository.find({
      relations: RELATIONS,
      order: { startDate: 'DESC' },
    });
  }

  async create(dto: CreateStaffLeaveDto): Promise<StaffMemberLeave> {
    const staffMember = await this.staffMemberRepository.findOne({ where: { id: dto.staffMemberId } });
    if (!staffMember) {
      throw new NotFoundException(`Staff member with ID ${dto.staffMemberId} not found`);
    }
    if (dto.endDate < dto.startDate) {
      throw new BadRequestException('End date must be on or after the start date');
    }

    const leave = this.leaveRepository.create({
      staffMemberId: dto.staffMemberId,
      leaveType: dto.leaveType ?? 'annual',
      startDate: dto.startDate,
      endDate: dto.endDate,
      reason: dto.reason ?? null,
    });
    const saved = await this.leaveRepository.save(leave);
    return this.leaveRepository.findOne({ where: { id: saved.id }, relations: RELATIONS }) as Promise<StaffMemberLeave>;
  }

  async decide(id: number, dto: DecideStaffLeaveDto): Promise<StaffMemberLeave> {
    const leave = await this.leaveRepository.findOne({ where: { id } });
    if (!leave) {
      throw new NotFoundException(`Leave record with ID ${id} not found`);
    }
    if (leave.status !== 'pending') {
      throw new ConflictException(`This leave request has already been ${leave.status}`);
    }

    leave.status = dto.status;
    leave.decisionNotes = dto.decisionNotes ?? null;
    await this.leaveRepository.save(leave);
    return this.leaveRepository.findOne({ where: { id }, relations: RELATIONS }) as Promise<StaffMemberLeave>;
  }

  async remove(id: number): Promise<void> {
    const leave = await this.leaveRepository.findOne({ where: { id } });
    if (!leave) {
      throw new NotFoundException(`Leave record with ID ${id} not found`);
    }
    await this.leaveRepository.remove(leave);
  }
}
