import { Repository } from 'typeorm';
import { WorkOrderLog } from '../entities/work-order-log.entity';
import { WorkOrder } from '../entities/work-order.entity';
import { CreateWorkOrderLogDto } from './dto/create-work-order-log.dto';
export declare class WorkOrderLogsService {
    private workOrderLogRepository;
    private workOrderRepository;
    constructor(workOrderLogRepository: Repository<WorkOrderLog>, workOrderRepository: Repository<WorkOrder>);
    findForWorkOrder(workOrderId: number): Promise<WorkOrderLog[]>;
    findAllForCompletedWorkOrders(): Promise<WorkOrderLog[]>;
    findAllLogs(): Promise<WorkOrderLog[]>;
    create(dto: CreateWorkOrderLogDto): Promise<WorkOrderLog>;
    remove(id: number): Promise<void>;
}
