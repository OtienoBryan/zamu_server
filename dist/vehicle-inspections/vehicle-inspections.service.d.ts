import { Repository } from 'typeorm';
import { VehicleInspection } from '../entities/vehicle-inspection.entity';
import { CreateVehicleInspectionDto } from './dto/create-vehicle-inspection.dto';
import { UpdateVehicleInspectionDto } from './dto/update-vehicle-inspection.dto';
export declare class VehicleInspectionsService {
    private inspectionRepository;
    constructor(inspectionRepository: Repository<VehicleInspection>);
    findByVehicle(conversionVehicleId: number): Promise<VehicleInspection[]>;
    findOne(id: number): Promise<VehicleInspection>;
    create(dto: CreateVehicleInspectionDto): Promise<VehicleInspection>;
    update(id: number, dto: UpdateVehicleInspectionDto): Promise<VehicleInspection>;
    remove(id: number): Promise<void>;
}
