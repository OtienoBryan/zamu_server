import { Repository } from 'typeorm';
import { ProductionStage } from '../entities/production-stage.entity';
import { CreateProductionStageDto } from './dto/create-production-stage.dto';
import { UpdateProductionStageDto } from './dto/update-production-stage.dto';
export declare class ProductionStagesService {
    private stageRepository;
    constructor(stageRepository: Repository<ProductionStage>);
    findAll(): Promise<ProductionStage[]>;
    findOne(id: number): Promise<ProductionStage>;
    create(dto: CreateProductionStageDto): Promise<ProductionStage>;
    update(id: number, dto: UpdateProductionStageDto): Promise<ProductionStage>;
    remove(id: number): Promise<void>;
}
