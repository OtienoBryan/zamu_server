import { ServicesCatalogService } from './services-catalog.service';
import { Service } from '../entities/service.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
export declare class ServicesCatalogController {
    private readonly servicesCatalogService;
    constructor(servicesCatalogService: ServicesCatalogService);
    findAll(): Promise<Service[]>;
    findOne(id: number): Promise<Service>;
    create(createServiceDto: CreateServiceDto): Promise<Service>;
    update(id: number, updateServiceDto: UpdateServiceDto): Promise<Service>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
