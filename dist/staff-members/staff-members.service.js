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
exports.StaffMembersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const staff_member_entity_1 = require("../entities/staff-member.entity");
let StaffMembersService = class StaffMembersService {
    staffMemberRepository;
    constructor(staffMemberRepository) {
        this.staffMemberRepository = staffMemberRepository;
    }
    async findAll() {
        return this.staffMemberRepository.find({ order: { name: 'ASC' } });
    }
    async findOne(id) {
        const staffMember = await this.staffMemberRepository.findOne({ where: { id } });
        if (!staffMember) {
            throw new common_1.NotFoundException(`Staff member with ID ${id} not found`);
        }
        return staffMember;
    }
    async create(dto) {
        const staffMember = this.staffMemberRepository.create({
            name: dto.name,
            mobileNumber: dto.mobileNumber ?? null,
            role: dto.role ?? null,
            hourlyRate: dto.hourlyRate ?? 0,
            status: dto.status ?? 'active',
        });
        return this.staffMemberRepository.save(staffMember);
    }
    async update(id, dto) {
        const staffMember = await this.findOne(id);
        Object.assign(staffMember, dto);
        return this.staffMemberRepository.save(staffMember);
    }
    async remove(id) {
        const staffMember = await this.findOne(id);
        await this.staffMemberRepository.remove(staffMember);
    }
};
exports.StaffMembersService = StaffMembersService;
exports.StaffMembersService = StaffMembersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(staff_member_entity_1.StaffMember)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], StaffMembersService);
//# sourceMappingURL=staff-members.service.js.map