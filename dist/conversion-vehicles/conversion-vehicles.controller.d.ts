import { ConversionVehiclesService } from './conversion-vehicles.service';
import { VehicleAnalysisService } from './services/vehicle-analysis.service';
import { ConversionVehicle } from '../entities/conversion-vehicle.entity';
import { CreateConversionVehicleDto } from './dto/create-conversion-vehicle.dto';
import { UpdateConversionVehicleDto } from './dto/update-conversion-vehicle.dto';
import { AnalyzeVehicleImageDto, VehicleAnalysisResult } from './dto/analyze-vehicle-image.dto';
export declare class ConversionVehiclesController {
    private readonly conversionVehiclesService;
    private readonly vehicleAnalysisService;
    constructor(conversionVehiclesService: ConversionVehiclesService, vehicleAnalysisService: VehicleAnalysisService);
    findAll(conversionClientId?: string): Promise<ConversionVehicle[]>;
    findOne(id: number): Promise<ConversionVehicle>;
    create(createConversionVehicleDto: CreateConversionVehicleDto): Promise<ConversionVehicle>;
    update(id: number, updateConversionVehicleDto: UpdateConversionVehicleDto): Promise<ConversionVehicle>;
    remove(id: number): Promise<{
        message: string;
    }>;
    analyzeImage(analyzeDto: AnalyzeVehicleImageDto): Promise<VehicleAnalysisResult>;
}
