import { DataSource, Repository } from 'typeorm';
import { WorkOrderWasteEntry, WorkOrderWasteType } from '../entities/work-order-waste.entity';
import { WorkOrder } from '../entities/work-order.entity';
import { RawMaterialStore } from '../entities/raw-material-store.entity';
import { CreateWorkOrderWasteDto } from './dto/create-work-order-waste.dto';
export declare class WorkOrderWasteService {
    private wasteRepository;
    private workOrderRepository;
    private storeRepository;
    private dataSource;
    constructor(wasteRepository: Repository<WorkOrderWasteEntry>, workOrderRepository: Repository<WorkOrder>, storeRepository: Repository<RawMaterialStore>, dataSource: DataSource);
    findForWorkOrder(workOrderId: number): Promise<WorkOrderWasteEntry[]>;
    findAll(type?: WorkOrderWasteType): Promise<WorkOrderWasteEntry[]>;
    create(dto: CreateWorkOrderWasteDto): Promise<WorkOrderWasteEntry>;
    remove(id: number): Promise<void>;
}
