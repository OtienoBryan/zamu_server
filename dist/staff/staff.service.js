"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = __importStar(require("bcryptjs"));
const staff_entity_1 = require("../entities/staff.entity");
const department_entity_1 = require("../entities/department.entity");
const DEFAULT_PASSWORD_HASH = '$2a$10$me0dzhAfGglEGPhcK/34BuWmhYW3USYy3SeMbe46CQop102Yq./1S';
let StaffService = class StaffService {
    staffRepository;
    departmentRepository;
    constructor(staffRepository, departmentRepository) {
        this.staffRepository = staffRepository;
        this.departmentRepository = departmentRepository;
    }
    sanitize(staff) {
        const { password, ...rest } = staff;
        return rest;
    }
    async findAll() {
        const all = await this.staffRepository.find({
            order: {
                created_at: 'DESC'
            }
        });
        return all.map((s) => this.sanitize(s));
    }
    async findOne(id) {
        const staff = await this.staffRepository.findOne({ where: { id } });
        return staff ? this.sanitize(staff) : null;
    }
    async create(createStaffDto) {
        const { password, ...rest } = createStaffDto;
        if (!rest.business_email) {
            throw new common_1.BadRequestException('Business email is required to create a staff login');
        }
        const hashedPassword = password && password.trim()
            ? await bcrypt.hash(password, 12)
            : DEFAULT_PASSWORD_HASH;
        const staff = this.staffRepository.create({
            photo_url: '',
            cash_balance: 0,
            pump_number: 0,
            is_active: 1,
            ...rest,
            password: hashedPassword,
        });
        const saved = await this.staffRepository.save(staff);
        return this.sanitize(saved);
    }
    async update(id, updateStaffDto) {
        const { password, ...rest } = updateStaffDto;
        const updatePayload = { ...rest };
        if (password && password.trim()) {
            updatePayload.password = await bcrypt.hash(password, 12);
        }
        await this.staffRepository.update(id, updatePayload);
        const updatedStaff = await this.findOne(id);
        if (!updatedStaff) {
            throw new common_1.NotFoundException('Staff member not found');
        }
        return updatedStaff;
    }
    async remove(id) {
        const result = await this.staffRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException('Staff member not found');
        }
    }
    async getStaffStats() {
        const allStaff = await this.staffRepository.find();
        const stats = {
            total: allStaff.length,
            active: allStaff.filter(staff => staff.is_active === 1).length,
            inactive: allStaff.filter(staff => staff.is_active === 0).length,
            byDepartment: {},
            byRole: {},
            byGender: {},
            byEmploymentType: {}
        };
        allStaff.forEach(staff => {
            const dept = staff.department || 'Unknown';
            stats.byDepartment[dept] = (stats.byDepartment[dept] || 0) + 1;
        });
        allStaff.forEach(staff => {
            const role = staff.role || 'Unknown';
            stats.byRole[role] = (stats.byRole[role] || 0) + 1;
        });
        allStaff.forEach(staff => {
            const gender = staff.gender || 'Unknown';
            stats.byGender[gender] = (stats.byGender[gender] || 0) + 1;
        });
        allStaff.forEach(staff => {
            const empType = staff.employment_type || 'Unknown';
            stats.byEmploymentType[empType] = (stats.byEmploymentType[empType] || 0) + 1;
        });
        return stats;
    }
    async findByDepartment(department) {
        const rows = await this.staffRepository.find({
            where: { department },
            order: { name: 'ASC' }
        });
        return rows.map((s) => this.sanitize(s));
    }
    async findByRole(role) {
        const rows = await this.staffRepository.find({
            where: { role },
            order: { name: 'ASC' }
        });
        return rows.map((s) => this.sanitize(s));
    }
    async findByEmploymentType(employmentType) {
        const rows = await this.staffRepository.find({
            where: { employment_type: employmentType },
            order: { name: 'ASC' }
        });
        return rows.map((s) => this.sanitize(s));
    }
    async searchStaff(searchTerm) {
        const rows = await this.staffRepository
            .createQueryBuilder('staff')
            .where('staff.name LIKE :searchTerm', { searchTerm: `%${searchTerm}%` })
            .orWhere('staff.empl_no LIKE :searchTerm', { searchTerm: `%${searchTerm}%` })
            .orWhere('staff.role LIKE :searchTerm', { searchTerm: `%${searchTerm}%` })
            .orWhere('staff.department LIKE :searchTerm', { searchTerm: `%${searchTerm}%` })
            .orderBy('staff.name', 'ASC')
            .getMany();
        return rows.map((s) => this.sanitize(s));
    }
    async getDepartments() {
        return this.departmentRepository.find({
            order: { name: 'ASC' }
        });
    }
    async getDepartmentById(id) {
        return this.departmentRepository.findOne({ where: { id } });
    }
    async createDepartment(createDepartmentDto) {
        const department = this.departmentRepository.create(createDepartmentDto);
        return this.departmentRepository.save(department);
    }
    async updateDepartment(id, updateDepartmentDto) {
        await this.departmentRepository.update(id, updateDepartmentDto);
        const updatedDepartment = await this.getDepartmentById(id);
        if (!updatedDepartment) {
            throw new common_1.NotFoundException('Department not found');
        }
        return updatedDepartment;
    }
    async deleteDepartment(id) {
        const result = await this.departmentRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException('Department not found');
        }
    }
};
exports.StaffService = StaffService;
exports.StaffService = StaffService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(staff_entity_1.Staff)),
    __param(1, (0, typeorm_1.InjectRepository)(department_entity_1.Department)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], StaffService);
//# sourceMappingURL=staff.service.js.map