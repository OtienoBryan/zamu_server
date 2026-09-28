import { SalesPostingsService } from './sales-postings.service';
import { CreateSalesPostingDto } from './dto/create-sales-posting.dto';
import { SalesPosting } from '../entities/sales-posting.entity';
export declare class SalesPostingsController {
    private readonly salesPostingsService;
    constructor(salesPostingsService: SalesPostingsService);
    findAll(stationId?: string): Promise<SalesPosting[]>;
    create(dto: CreateSalesPostingDto, req: any): Promise<SalesPosting>;
    update(id: string, dto: CreateSalesPostingDto, req: any): Promise<SalesPosting>;
}
