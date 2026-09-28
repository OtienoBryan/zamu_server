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
exports.StaffMemberLeavesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const staff_member_leave_entity_1 = require("../entities/staff-member-leave.entity");
const staff_member_entity_1 = require("../entities/staff-member.entity");
const RELATIONS = ['staffMember'];
let StaffMemberLeavesService = class StaffMemberLeavesService {
    leaveRepository;
    staffMemberRepository;
    constructor(leaveRepository, staffMemberRepository) {
        this.leaveRepository = leaveRepository;
        this.staffMemberRepository = staffMemberRepository;
    }
    async findAll() {
        return this.leaveRepository.find({
            relations: RELATIONS,
            order: { startDate: 'DESC' },
        });
    }
    async create(dto) {
        const staffMember = await this.staffMemberRepository.findOne({ where: { id: dto.staffMemberId } });
        if (!staffMember) {
            throw new common_1.NotFoundException(`Staff member with ID ${dto.staffMemberId} not found`);
        }
        if (dto.endDate < dto.startDate) {
            throw new common_1.BadRequestException('End date must be on or after the start date');
        }
        const leave = this.leaveRepository.create({
            staffMemberId: dto.staffMemberId,
            leaveType: dto.leaveType ?? 'annual',
            startDate: dto.startDate,
            endDate: dto.endDate,
            reason: dto.reason ?? null,
        });
        const saved = await this.leaveRepository.save(leave);
        return this.leaveRepository.findOne({ where: { id: saved.id }, relations: RELATIONS });
    }
    async decide(id, dto) {
        const leave = await this.leaveRepository.findOne({ where: { id } });
        if (!leave) {
            throw new common_1.NotFoundException(`Leave record with ID ${id} not found`);
        }
        if (leave.status !== 'pending') {
            throw new common_1.ConflictException(`This leave request has already been ${leave.status}`);
        }
        leave.status = dto.status;
        leave.decisionNotes = dto.decisionNotes ?? null;
        await this.leaveRepository.save(leave);
        return this.leaveRepository.findOne({ where: { id }, relations: RELATIONS });
    }
    async remove(id) {
        const leave = await this.leaveRepository.findOne({ where: { id } });
        if (!leave) {
            throw new common_1.NotFoundException(`Leave record with ID ${id} not found`);
        }
        await this.leaveRepository.remove(leave);
    }
};
exports.StaffMemberLeavesService = StaffMemberLeavesService;
exports.StaffMemberLeavesService = StaffMemberLeavesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(staff_member_leave_entity_1.StaffMemberLeave)),
    __param(1, (0, typeorm_1.InjectRepository)(staff_member_entity_1.StaffMember)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], StaffMemberLeavesService);
//# sourceMappingURL=staff-member-leaves.service.js.map