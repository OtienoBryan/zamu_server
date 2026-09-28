import { Repository, DataSource } from 'typeorm';
import { LabourPayment } from '../entities/labour-payment.entity';
import { CreateLabourPaymentDto } from './dto/create-labour-payment.dto';
export declare class LabourPaymentsService {
    private labourPaymentRepository;
    private dataSource;
    constructor(labourPaymentRepository: Repository<LabourPayment>, dataSource: DataSource);
    findAll(): Promise<LabourPayment[]>;
    create(dto: CreateLabourPaymentDto, createdBy: number): Promise<LabourPayment>;
    remove(id: number): Promise<void>;
}
