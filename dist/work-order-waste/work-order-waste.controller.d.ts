import { WorkOrderWasteService } from './work-order-waste.service';
import { WorkOrderWasteEntry } from '../entities/work-order-waste.entity';
import { CreateWorkOrderWasteDto } from './dto/create-work-order-waste.dto';
export declare class WorkOrderWasteController {
    private readonly workOrderWasteService;
    constructor(workOrderWasteService: WorkOrderWasteService);
    findAll(workOrderId?: string, type?: string): Promise<WorkOrderWasteEntry[]>;
    create(dto: CreateWorkOrderWasteDto): Promise<WorkOrderWasteEntry>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
