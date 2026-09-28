import { Repository } from 'typeorm';
import { ConversionVehicle } from '../entities/conversion-vehicle.entity';
import { ConversionClient } from '../entities/conversion-client.entity';
import { CreateConversionVehicleDto } from './dto/create-conversion-vehicle.dto';
import { UpdateConversionVehicleDto } from './dto/update-conversion-vehicle.dto';
export declare class ConversionVehiclesService {
    private conversionVehicleRepository;
    private conversionClientRepository;
    constructor(conversionVehicleRepository: Repository<ConversionVehicle>, conversionClientRepository: Repository<ConversionClient>);
    private sanitizeDocuments;
    findAll(): Promise<ConversionVehicle[]>;
    findByConversionClient(conversionClientId: number): Promise<ConversionVehicle[]>;
    findOne(id: number): Promise<ConversionVehicle>;
    create(createConversionVehicleDto: CreateConversionVehicleDto): Promise<ConversionVehicle>;
    update(id: number, updateConversionVehicleDto: UpdateConversionVehicleDto): Promise<ConversionVehicle>;
    remove(id: number): Promise<void>;
}
