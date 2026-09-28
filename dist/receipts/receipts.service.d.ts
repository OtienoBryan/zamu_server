import { Repository } from 'typeorm';
import { Receipt } from '../entities/receipt.entity';
export declare class ReceiptsService {
    private receiptRepository;
    constructor(receiptRepository: Repository<Receipt>);
    findAll(): Promise<Receipt[]>;
    findOne(id: number): Promise<Receipt>;
    findByPayment(posSalePaymentId: number): Promise<Receipt>;
}
