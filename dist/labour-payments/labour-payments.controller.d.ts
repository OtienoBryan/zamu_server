import { LabourPaymentsService } from './labour-payments.service';
import { LabourPayment } from '../entities/labour-payment.entity';
import { CreateLabourPaymentDto } from './dto/create-labour-payment.dto';
export declare class LabourPaymentsController {
    private readonly labourPaymentsService;
    constructor(labourPaymentsService: LabourPaymentsService);
    findAll(): Promise<LabourPayment[]>;
    create(dto: CreateLabourPaymentDto, req: any): Promise<LabourPayment>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
