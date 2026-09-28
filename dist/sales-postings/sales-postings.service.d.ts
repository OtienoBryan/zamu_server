import { Repository } from 'typeorm';
import { SalesPosting } from '../entities/sales-posting.entity';
import { CreateSalesPostingDto } from './dto/create-sales-posting.dto';
export interface FindSalesPostingsQuery {
    stationId?: number;
}
export declare class SalesPostingsService {
    private salesPostingRepository;
    constructor(salesPostingRepository: Repository<SalesPosting>);
    findAll(query: FindSalesPostingsQuery): Promise<SalesPosting[]>;
    create(dto: CreateSalesPostingDto, postedBy: number | null): Promise<SalesPosting>;
    update(id: number, dto: CreateSalesPostingDto, postedBy: number | null): Promise<SalesPosting>;
}
