import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleInspection } from '../entities/vehicle-inspection.entity';
import { CreateVehicleInspectionDto } from './dto/create-vehicle-inspection.dto';
import { UpdateVehicleInspectionDto } from './dto/update-vehicle-inspection.dto';

const RELATIONS = ['technician', 'conversionVehicle', 'conversionClient'];

@Injectable()
export class VehicleInspectionsService {
  constructor(
    @InjectRepository(VehicleInspection)
    private inspectionRepository: Repository<VehicleInspection>,
  ) {}

  async findByVehicle(conversionVehicleId: number): Promise<VehicleInspection[]> {
    return this.inspectionRepository.find({
      where: { conversion_vehicle_id: conversionVehicleId },
      relations: RELATIONS,
      order: { inspection_date: 'DESC' },
    });
  }

  async findOne(id: number): Promise<VehicleInspection> {
    const inspection = await this.inspectionRepository.findOne({
      where: { id },
      relations: RELATIONS,
    });

    if (!inspection) {
      throw new NotFoundException(`Vehicle inspection with ID ${id} not found`);
    }

    return inspection;
  }

  async create(dto: CreateVehicleInspectionDto): Promise<VehicleInspection> {
    const inspection = this.inspectionRepository.create({
      conversion_vehicle_id: dto.conversion_vehicle_id,
      conversion_client_id: dto.conversion_client_id,
      assigned_staff_id: dto.assigned_staff_id,
      inspection_date: dto.inspection_date,
      status: dto.status || 'pending',
      summary: dto.summary ?? null,
      checklist: dto.checklist ?? null,
      issues_found: dto.issues_found ?? 0,
    });

    const saved = await this.inspectionRepository.save(inspection);
    return this.findOne(saved.id);
  }

  async update(id: number, dto: UpdateVehicleInspectionDto): Promise<VehicleInspection> {
    const inspection = await this.findOne(id);
    Object.assign(inspection, dto);
    await this.inspectionRepository.save(inspection);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const inspection = await this.findOne(id);
    await this.inspectionRepository.remove(inspection);
  }
}
