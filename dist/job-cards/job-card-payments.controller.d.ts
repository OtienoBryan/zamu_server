import { JobCardPaymentsService } from './job-card-payments.service';
import { JobCardPayment } from '../entities/job-card-payment.entity';
import { CreateJobCardPaymentDto } from './dto/create-job-card-payment.dto';
export declare class JobCardPaymentsController {
    private readonly jobCardPaymentsService;
    constructor(jobCardPaymentsService: JobCardPaymentsService);
    findAll(jobCardId: number): Promise<JobCardPayment[]>;
    create(jobCardId: number, dto: CreateJobCardPaymentDto, req: any): Promise<JobCardPayment>;
}
export declare class PaymentsController {
    private readonly jobCardPaymentsService;
    constructor(jobCardPaymentsService: JobCardPaymentsService);
    findAll(): Promise<JobCardPayment[]>;
}
