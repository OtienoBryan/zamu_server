import { Repository, DataSource } from 'typeorm';
import { WorkOrder } from '../entities/work-order.entity';
import { FinishedProduct } from '../entities/finished-product.entity';
import { FinishedProductMaterial } from '../entities/finished-product-material.entity';
import { ProductionStage } from '../entities/production-stage.entity';
import { StaffMember } from '../entities/staff-member.entity';
import { RawMaterialStore } from '../entities/raw-material-store.entity';
import { CreateWorkOrderDto } from './dto/create-work-order.dto';
import { UpdateWorkOrderDto } from './dto/update-work-order.dto';
import { ConfirmWorkOrderDto } from './dto/confirm-work-order.dto';
export declare class WorkOrdersService {
    private workOrderRepository;
    private productRepository;
    private materialRepository;
    private stageRepository;
    private staffRepository;
    private storeRepository;
    private dataSource;
    constructor(workOrderRepository: Repository<WorkOrder>, productRepository: Repository<FinishedProduct>, materialRepository: Repository<FinishedProductMaterial>, stageRepository: Repository<ProductionStage>, staffRepository: Repository<StaffMember>, storeRepository: Repository<RawMaterialStore>, dataSource: DataSource);
    findAll(): Promise<WorkOrder[]>;
    findOne(id: number): Promise<WorkOrder>;
    create(dto: CreateWorkOrderDto): Promise<WorkOrder>;
    update(id: number, dto: UpdateWorkOrderDto): Promise<WorkOrder>;
    remove(id: number): Promise<void>;
    confirmComplete(id: number, dto: ConfirmWorkOrderDto): Promise<WorkOrder>;
    private ensureReferencesExist;
    private ensureMaterialsInBom;
    private dedupeMaterials;
}
