import { WorkOrdersService } from './work-orders.service';
import { WorkOrder } from '../entities/work-order.entity';
import { CreateWorkOrderDto } from './dto/create-work-order.dto';
import { UpdateWorkOrderDto } from './dto/update-work-order.dto';
import { ConfirmWorkOrderDto } from './dto/confirm-work-order.dto';
export declare class WorkOrdersController {
    private readonly workOrdersService;
    constructor(workOrdersService: WorkOrdersService);
    findAll(): Promise<WorkOrder[]>;
    findOne(id: number): Promise<WorkOrder>;
    create(dto: CreateWorkOrderDto): Promise<WorkOrder>;
    update(id: number, dto: UpdateWorkOrderDto): Promise<WorkOrder>;
    remove(id: number): Promise<{
        message: string;
    }>;
    confirm(id: number, dto: ConfirmWorkOrderDto): Promise<WorkOrder>;
}
