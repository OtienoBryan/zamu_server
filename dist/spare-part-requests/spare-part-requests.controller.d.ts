import { SparePartRequestsService } from './spare-part-requests.service';
import { SparePartRequest } from '../entities/spare-part-request.entity';
import { CreateSparePartRequestDto } from './dto/create-spare-part-request.dto';
import { FulfillSparePartRequestDto } from './dto/fulfill-spare-part-request.dto';
export declare class SparePartRequestsController {
    private readonly requestsService;
    constructor(requestsService: SparePartRequestsService);
    findAll(): Promise<SparePartRequest[]>;
    findOne(id: number): Promise<SparePartRequest>;
    create(dto: CreateSparePartRequestDto, req: any): Promise<SparePartRequest>;
    fulfill(id: number, dto: FulfillSparePartRequestDto, req: any): Promise<SparePartRequest>;
    cancel(id: number): Promise<SparePartRequest>;
}
