import { PosSalesService } from './pos-sales.service';
import { PosSale } from '../entities/pos-sale.entity';
import { CreatePosSaleDto } from './dto/create-pos-sale.dto';
export declare class PosSalesController {
    private readonly posSalesService;
    constructor(posSalesService: PosSalesService);
    findAll(): Promise<PosSale[]>;
    findOne(id: number): Promise<PosSale>;
    create(dto: CreatePosSaleDto, req: any): Promise<PosSale>;
}
