import { Repository, DataSource } from 'typeorm';
import { Quotation } from '../entities/quotation.entity';
import { FinishedProduct } from '../entities/finished-product.entity';
import { ClientRecord } from '../entities/client-record.entity';
import { PosSale } from '../entities/pos-sale.entity';
import { CreateQuotationDto } from './dto/create-quotation.dto';
import { UpdateQuotationDto } from './dto/update-quotation.dto';
import { PosSalesService } from '../pos-sales/pos-sales.service';
export declare class QuotationsService {
    private quotationRepository;
    private productRepository;
    private clientRepository;
    private dataSource;
    private posSalesService;
    constructor(quotationRepository: Repository<Quotation>, productRepository: Repository<FinishedProduct>, clientRepository: Repository<ClientRecord>, dataSource: DataSource, posSalesService: PosSalesService);
    private redactStaff;
    findAll(): Promise<Quotation[]>;
    findOne(id: number): Promise<Quotation>;
    private validateReferences;
    create(dto: CreateQuotationDto, createdBy: number): Promise<Quotation>;
    update(id: number, dto: UpdateQuotationDto): Promise<Quotation>;
    remove(id: number): Promise<void>;
    convertToInvoice(id: number, storeId: number, createdBy: number): Promise<{
        quotation: Quotation;
        sale: PosSale;
    }>;
}
