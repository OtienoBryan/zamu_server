import { Repository, DataSource } from 'typeorm';
import { PosSalePayment } from '../entities/pos-sale-payment.entity';
import { PosSale } from '../entities/pos-sale.entity';
import { ChartOfAccount } from '../entities/chart-of-account.entity';
import { CreatePosSalePaymentDto } from './dto/create-pos-sale-payment.dto';
export declare class PosSalePaymentsService {
    private paymentRepository;
    private posSaleRepository;
    private chartOfAccountRepository;
    private dataSource;
    constructor(paymentRepository: Repository<PosSalePayment>, posSaleRepository: Repository<PosSale>, chartOfAccountRepository: Repository<ChartOfAccount>, dataSource: DataSource);
    findAll(): Promise<PosSalePayment[]>;
    findForSale(posSaleId: number): Promise<PosSalePayment[]>;
    create(dto: CreatePosSalePaymentDto, createdBy: number): Promise<PosSalePayment>;
    remove(id: number): Promise<void>;
}
