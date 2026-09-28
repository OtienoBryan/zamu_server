"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffAttendanceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const staff_attendance_entity_1 = require("../entities/staff-attendance.entity");
const staff_member_entity_1 = require("../entities/staff-member.entity");
const RELATIONS = ['staffMember'];
let StaffAttendanceService = class StaffAttendanceService {
    attendanceRepository;
    staffMemberRepository;
    constructor(attendanceRepository, staffMemberRepository) {
        this.attendanceRepository = attendanceRepository;
        this.staffMemberRepository = staffMemberRepository;
    }
    async findAll() {
        return this.attendanceRepository.find({
            relations: RELATIONS,
            order: { checkInAt: 'DESC' },
        });
    }
    async checkIn(dto) {
        const staffMember = await this.staffMemberRepository.findOne({ where: { id: dto.staffMemberId } });
        if (!staffMember) {
            throw new common_1.NotFoundException(`Staff member with ID ${dto.staffMemberId} not found`);
        }
        const open = await this.attendanceRepository.findOne({
            where: { staffMemberId: dto.staffMemberId, checkOutAt: (0, typeorm_2.IsNull)() },
        });
        if (open) {
            throw new common_1.ConflictException(`${staffMember.name} is already checked in (since ${open.checkInAt.toISOString()}) — check them out first`);
        }
        const attendance = this.attendanceRepository.create({
            staffMemberId: dto.staffMemberId,
            checkInAt: new Date(dto.checkInAt),
            notes: dto.notes ?? null,
        });
        const saved = await this.attendanceRepository.save(attendance);
        return this.attendanceRepository.findOne({ where: { id: saved.id }, relations: RELATIONS });
    }
    async checkOut(id, dto) {
        const attendance = await this.attendanceRepository.findOne({ where: { id } });
        if (!attendance) {
            throw new common_1.NotFoundException(`Attendance record with ID ${id} not found`);
        }
        if (attendance.checkOutAt != null) {
            throw new common_1.ConflictException('This shift has already been checked out');
        }
        const checkOutAt = new Date(dto.checkOutAt);
        if (checkOutAt <= attendance.checkInAt) {
            throw new common_1.BadRequestException('Check-out time must be after check-in time');
        }
        attendance.checkOutAt = checkOutAt;
        await this.attendanceRepository.save(attendance);
        return this.attendanceRepository.findOne({ where: { id }, relations: RELATIONS });
    }
    async remove(id) {
        const attendance = await this.attendanceRepository.findOne({ where: { id } });
        if (!attendance) {
            throw new common_1.NotFoundException(`Attendance record with ID ${id} not found`);
        }
        await this.attendanceRepository.remove(attendance);
    }
};
exports.StaffAttendanceService = StaffAttendanceService;
exports.StaffAttendanceService = StaffAttendanceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(staff_attendance_entity_1.StaffAttendance)),
    __param(1, (0, typeorm_1.InjectRepository)(staff_member_entity_1.StaffMember)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], StaffAttendanceService);
//# sourceMappingURL=staff-attendance.service.js.map