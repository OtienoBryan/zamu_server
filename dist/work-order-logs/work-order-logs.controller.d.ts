import { WorkOrderLogsService } from './work-order-logs.service';
import { WorkOrderLog } from '../entities/work-order-log.entity';
import { CreateWorkOrderLogDto } from './dto/create-work-order-log.dto';
export declare class WorkOrderLogsController {
    private readonly workOrderLogsService;
    constructor(workOrderLogsService: WorkOrderLogsService);
    findAll(workOrderId?: string, all?: string): Promise<WorkOrderLog[]>;
    create(dto: CreateWorkOrderLogDto): Promise<WorkOrderLog>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
