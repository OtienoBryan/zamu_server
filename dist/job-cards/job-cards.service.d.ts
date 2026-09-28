import { Repository } from 'typeorm';
import { JobCard } from '../entities/job-card.entity';
import { JobCardItem } from '../entities/job-card-item.entity';
import { CreateJobCardDto } from './dto/create-job-card.dto';
import { UpdateJobCardDto } from './dto/update-job-card.dto';
import { ConvertToInvoiceDto } from './dto/convert-to-invoice.dto';
import { InventoryService } from '../inventory/inventory.service';
export declare class JobCardsService {
    private jobCardRepository;
    private jobCardItemRepository;
    private inventoryService;
    constructor(jobCardRepository: Repository<JobCard>, jobCardItemRepository: Repository<JobCardItem>, inventoryService: InventoryService);
    findAll(conversionVehicleId?: number, conversionClientId?: number): Promise<JobCard[]>;
    findOne(id: number): Promise<JobCard>;
    create(dto: CreateJobCardDto): Promise<JobCard>;
    update(id: number, dto: UpdateJobCardDto): Promise<JobCard>;
    remove(id: number): Promise<void>;
    convertToInvoice(id: number, dto: ConvertToInvoiceDto): Promise<JobCard>;
    private replaceItems;
}
