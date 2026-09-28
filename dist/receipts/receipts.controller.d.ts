import { ReceiptsService } from './receipts.service';
import { Receipt } from '../entities/receipt.entity';
export declare class ReceiptsController {
    private readonly receiptsService;
    constructor(receiptsService: ReceiptsService);
    findAll(): Promise<Receipt[]>;
    findByPayment(paymentId: number): Promise<Receipt>;
    findOne(id: number): Promise<Receipt>;
}
