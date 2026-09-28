import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { StaffAttendance } from '../entities/staff-attendance.entity';
import { StaffMember } from '../entities/staff-member.entity';
import { CheckInDto } from './dto/check-in.dto';
import { CheckOutDto } from './dto/check-out.dto';

const RELATIONS = ['staffMember'];

@Injectable()
export class StaffAttendanceService {
  constructor(
    @InjectRepository(StaffAttendance)
    private attendanceRepository: Repository<StaffAttendance>,
    @InjectRepository(StaffMember)
    private staffMemberRepository: Repository<StaffMember>,
  ) {}

  async findAll(): Promise<StaffAttendance[]> {
    return this.attendanceRepository.find({
      relations: RELATIONS,
      order: { checkInAt: 'DESC' },
    });
  }

  async checkIn(dto: CheckInDto): Promise<StaffAttendance> {
    const staffMember = await this.staffMemberRepository.findOne({ where: { id: dto.staffMemberId } });
    if (!staffMember) {
      throw new NotFoundException(`Staff member with ID ${dto.staffMemberId} not found`);
    }

    // One open shift per staff member at a time — check them out before they can check in again.
    const open = await this.attendanceRepository.findOne({
      where: { staffMemberId: dto.staffMemberId, checkOutAt: IsNull() },
    });
    if (open) {
      throw new ConflictException(`${staffMember.name} is already checked in (since ${open.checkInAt.toISOString()}) — check them out first`);
    }

    const attendance = this.attendanceRepository.create({
      staffMemberId: dto.staffMemberId,
      checkInAt: new Date(dto.checkInAt),
      notes: dto.notes ?? null,
    });
    const saved = await this.attendanceRepository.save(attendance);
    return this.attendanceRepository.findOne({ where: { id: saved.id }, relations: RELATIONS }) as Promise<StaffAttendance>;
  }

  async checkOut(id: number, dto: CheckOutDto): Promise<StaffAttendance> {
    const attendance = await this.attendanceRepository.findOne({ where: { id } });
    if (!attendance) {
      throw new NotFoundException(`Attendance record with ID ${id} not found`);
    }
    if (attendance.checkOutAt != null) {
      throw new ConflictException('This shift has already been checked out');
    }
    const checkOutAt = new Date(dto.checkOutAt);
    if (checkOutAt <= attendance.checkInAt) {
      throw new BadRequestException('Check-out time must be after check-in time');
    }

    attendance.checkOutAt = checkOutAt;
    await this.attendanceRepository.save(attendance);
    return this.attendanceRepository.findOne({ where: { id }, relations: RELATIONS }) as Promise<StaffAttendance>;
  }

  async remove(id: number): Promise<void> {
    const attendance = await this.attendanceRepository.findOne({ where: { id } });
    if (!attendance) {
      throw new NotFoundException(`Attendance record with ID ${id} not found`);
    }
    await this.attendanceRepository.remove(attendance);
  }
}
