import { Repository } from 'typeorm';
import { JobCardPayment } from '../entities/job-card-payment.entity';
import { JobCard } from '../entities/job-card.entity';
import { CreateJobCardPaymentDto } from './dto/create-job-card-payment.dto';
export declare class JobCardPaymentsService {
    private paymentRepository;
    private jobCardRepository;
    constructor(paymentRepository: Repository<JobCardPayment>, jobCardRepository: Repository<JobCard>);
    findAllForJobCard(jobCardId: number): Promise<JobCardPayment[]>;
    findAll(): Promise<JobCardPayment[]>;
    create(jobCardId: number, dto: CreateJobCardPaymentDto, postedBy?: number | null): Promise<JobCardPayment>;
}
