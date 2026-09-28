import { VehicleInspectionsService } from './vehicle-inspections.service';
import { VehicleInspection } from '../entities/vehicle-inspection.entity';
import { CreateVehicleInspectionDto } from './dto/create-vehicle-inspection.dto';
import { UpdateVehicleInspectionDto } from './dto/update-vehicle-inspection.dto';
export declare class VehicleInspectionsController {
    private readonly vehicleInspectionsService;
    constructor(vehicleInspectionsService: VehicleInspectionsService);
    findByVehicle(conversionVehicleId: number): Promise<VehicleInspection[]>;
    findOne(id: number): Promise<VehicleInspection>;
    create(createDto: CreateVehicleInspectionDto): Promise<VehicleInspection>;
    update(id: number, updateDto: UpdateVehicleInspectionDto): Promise<VehicleInspection>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
