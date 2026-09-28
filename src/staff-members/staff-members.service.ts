import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StaffMember } from '../entities/staff-member.entity';
import { CreateStaffMemberDto } from './dto/create-staff-member.dto';
import { UpdateStaffMemberDto } from './dto/update-staff-member.dto';

@Injectable()
export class StaffMembersService {
  constructor(
    @InjectRepository(StaffMember)
    private staffMemberRepository: Repository<StaffMember>,
  ) {}

  async findAll(): Promise<StaffMember[]> {
    return this.staffMemberRepository.find({ order: { name: 'ASC' } });
  }

  async findOne(id: number): Promise<StaffMember> {
    const staffMember = await this.staffMemberRepository.findOne({ where: { id } });
    if (!staffMember) {
      throw new NotFoundException(`Staff member with ID ${id} not found`);
    }
    return staffMember;
  }

  async create(dto: CreateStaffMemberDto): Promise<StaffMember> {
    const staffMember = this.staffMemberRepository.create({
      name: dto.name,
      mobileNumber: dto.mobileNumber ?? null,
      role: dto.role ?? null,
      hourlyRate: dto.hourlyRate ?? 0,
      status: dto.status ?? 'active',
    });
    return this.staffMemberRepository.save(staffMember);
  }

  async update(id: number, dto: UpdateStaffMemberDto): Promise<StaffMember> {
    const staffMember = await this.findOne(id);
    Object.assign(staffMember, dto);
    return this.staffMemberRepository.save(staffMember);
  }

  async remove(id: number): Promise<void> {
    const staffMember = await this.findOne(id);
    await this.staffMemberRepository.remove(staffMember);
  }
}
