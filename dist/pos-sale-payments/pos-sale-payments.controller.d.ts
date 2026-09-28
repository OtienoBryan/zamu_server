import { PosSalePaymentsService } from './pos-sale-payments.service';
import { PosSalePayment } from '../entities/pos-sale-payment.entity';
import { CreatePosSalePaymentDto } from './dto/create-pos-sale-payment.dto';
export declare class PosSalePaymentsController {
    private readonly posSalePaymentsService;
    constructor(posSalePaymentsService: PosSalePaymentsService);
    findAll(posSaleId?: string): Promise<PosSalePayment[]>;
    create(dto: CreatePosSalePaymentDto, req: any): Promise<PosSalePayment>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
