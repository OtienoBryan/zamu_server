import { QuotationsService } from './quotations.service';
import { Quotation } from '../entities/quotation.entity';
import { PosSale } from '../entities/pos-sale.entity';
import { CreateQuotationDto } from './dto/create-quotation.dto';
import { UpdateQuotationDto } from './dto/update-quotation.dto';
import { ConvertQuotationDto } from './dto/convert-quotation.dto';
export declare class QuotationsController {
    private readonly quotationsService;
    constructor(quotationsService: QuotationsService);
    findAll(): Promise<Quotation[]>;
    findOne(id: number): Promise<Quotation>;
    create(dto: CreateQuotationDto, req: any): Promise<Quotation>;
    update(id: number, dto: UpdateQuotationDto): Promise<Quotation>;
    remove(id: number): Promise<{
        message: string;
    }>;
    convert(id: number, dto: ConvertQuotationDto, req: any): Promise<{
        quotation: Quotation;
        sale: PosSale;
    }>;
}
