import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Staff } from '../entities/staff.entity';
import { Department } from '../entities/department.entity';

export interface StaffStats {
  total: number;
  active: number;
  inactive: number;
  byDepartment: Record<string, number>;
  byRole: Record<string, number>;
  byGender: Record<string, number>;
  byEmploymentType: Record<string, number>;
}

// Pre-computed bcrypt hash (of 'admin123') applied to new accounts created
// without a password specified — stored as-is, never re-hashed.
const DEFAULT_PASSWORD_HASH = '$2a$10$me0dzhAfGglEGPhcK/34BuWmhYW3USYy3SeMbe46CQop102Yq./1S';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff)
    private staffRepository: Repository<Staff>,
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}

  // Never let the password hash leave this module — findAll/findOne/create/update
  // all funnel through this before returning to the controller.
  private sanitize(staff: Staff): Staff {
    const { password, ...rest } = staff;
    return rest as Staff;
  }

  async findAll(): Promise<Staff[]> {
    const all = await this.staffRepository.find({
      order: {
        created_at: 'DESC'
      }
    });
    return all.map((s) => this.sanitize(s));
  }

  async findOne(id: number): Promise<Staff | null> {
    const staff = await this.staffRepository.findOne({ where: { id } });
    return staff ? this.sanitize(staff) : null;
  }

  async create(createStaffDto: Partial<Staff> & { password?: string }): Promise<Staff> {
    const { password, ...rest } = createStaffDto;
    if (!rest.business_email) {
      throw new BadRequestException('Business email is required to create a staff login');
    }

    const hashedPassword = password && password.trim()
      ? await bcrypt.hash(password, 12)
      : DEFAULT_PASSWORD_HASH;
    // Columns that are NOT NULL with no database default and aren't collected
    // by the staff management form — safe zero-value defaults so the insert
    // doesn't fail on them.
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

  async update(id: number, updateStaffDto: Partial<Staff> & { password?: string }): Promise<Staff> {
    const { password, ...rest } = updateStaffDto;
    const updatePayload: Partial<Staff> = { ...rest };
    if (password && password.trim()) {
      updatePayload.password = await bcrypt.hash(password, 12);
    }
    await this.staffRepository.update(id, updatePayload);
    const updatedStaff = await this.findOne(id);
    if (!updatedStaff) {
      throw new NotFoundException('Staff member not found');
    }
    return updatedStaff;
  }

  async remove(id: number): Promise<void> {
    const result = await this.staffRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Staff member not found');
    }
  }

  async getStaffStats(): Promise<StaffStats> {
    const allStaff = await this.staffRepository.find();

    const stats: StaffStats = {
      total: allStaff.length,
      active: allStaff.filter(staff => staff.is_active === 1).length,
      inactive: allStaff.filter(staff => staff.is_active === 0).length,
      byDepartment: {},
      byRole: {},
      byGender: {},
      byEmploymentType: {}
    };

    // Count by department
    allStaff.forEach(staff => {
      const dept = staff.department || 'Unknown';
      stats.byDepartment[dept] = (stats.byDepartment[dept] || 0) + 1;
    });

    // Count by role
    allStaff.forEach(staff => {
      const role = staff.role || 'Unknown';
      stats.byRole[role] = (stats.byRole[role] || 0) + 1;
    });

    // Count by gender
    allStaff.forEach(staff => {
      const gender = staff.gender || 'Unknown';
      stats.byGender[gender] = (stats.byGender[gender] || 0) + 1;
    });

    // Count by employment type
    allStaff.forEach(staff => {
      const empType = staff.employment_type || 'Unknown';
      stats.byEmploymentType[empType] = (stats.byEmploymentType[empType] || 0) + 1;
    });

    return stats;
  }

  async findByDepartment(department: string): Promise<Staff[]> {
    const rows = await this.staffRepository.find({
      where: { department },
      order: { name: 'ASC' }
    });
    return rows.map((s) => this.sanitize(s));
  }

  async findByRole(role: string): Promise<Staff[]> {
    const rows = await this.staffRepository.find({
      where: { role },
      order: { name: 'ASC' }
    });
    return rows.map((s) => this.sanitize(s));
  }

  async findByEmploymentType(employmentType: string): Promise<Staff[]> {
    const rows = await this.staffRepository.find({
      where: { employment_type: employmentType },
      order: { name: 'ASC' }
    });
    return rows.map((s) => this.sanitize(s));
  }

  async searchStaff(searchTerm: string): Promise<Staff[]> {
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

  // Department methods
  async getDepartments(): Promise<Department[]> {
    return this.departmentRepository.find({
      order: { name: 'ASC' }
    });
  }

  async getDepartmentById(id: number): Promise<Department | null> {
    return this.departmentRepository.findOne({ where: { id } });
  }

  async createDepartment(createDepartmentDto: Partial<Department>): Promise<Department> {
    const department = this.departmentRepository.create(createDepartmentDto);
    return this.departmentRepository.save(department);
  }

  async updateDepartment(id: number, updateDepartmentDto: Partial<Department>): Promise<Department> {
    await this.departmentRepository.update(id, updateDepartmentDto);
    const updatedDepartment = await this.getDepartmentById(id);
    if (!updatedDepartment) {
      throw new NotFoundException('Department not found');
    }
    return updatedDepartment;
  }

  async deleteDepartment(id: number): Promise<void> {
    const result = await this.departmentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Department not found');
    }
  }
}
