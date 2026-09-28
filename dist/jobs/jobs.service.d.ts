import { Repository } from 'typeorm';
import { Job } from '../entities/job.entity';
import { FinishedProduct } from '../entities/finished-product.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
export declare class JobsService {
    private jobRepository;
    private productRepository;
    constructor(jobRepository: Repository<Job>, productRepository: Repository<FinishedProduct>);
    findAll(): Promise<Job[]>;
    findOne(id: number): Promise<Job>;
    create(dto: CreateJobDto): Promise<Job>;
    update(id: number, dto: UpdateJobDto): Promise<Job>;
    remove(id: number): Promise<void>;
    private ensureProductExists;
    private ensureDateOrder;
}
