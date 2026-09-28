import { Repository, DataSource } from 'typeorm';
import { PosSale } from '../entities/pos-sale.entity';
import { FinishedProduct } from '../entities/finished-product.entity';
import { ClientRecord } from '../entities/client-record.entity';
import { RawMaterialStore } from '../entities/raw-material-store.entity';
import { CreatePosSaleDto } from './dto/create-pos-sale.dto';
export declare class PosSalesService {
    private posSaleRepository;
    private productRepository;
    private clientRepository;
    private storeRepository;
    private dataSource;
    constructor(posSaleRepository: Repository<PosSale>, productRepository: Repository<FinishedProduct>, clientRepository: Repository<ClientRecord>, storeRepository: Repository<RawMaterialStore>, dataSource: DataSource);
    private redactStaff;
    findAll(): Promise<PosSale[]>;
    findOne(id: number): Promise<PosSale>;
    create(dto: CreatePosSaleDto, createdBy: number): Promise<PosSale>;
}
