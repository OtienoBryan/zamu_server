import { JobsService } from './jobs.service';
import { Job } from '../entities/job.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
export declare class JobsController {
    private readonly jobsService;
    constructor(jobsService: JobsService);
    findAll(): Promise<Job[]>;
    findOne(id: number): Promise<Job>;
    create(dto: CreateJobDto): Promise<Job>;
    update(id: number, dto: UpdateJobDto): Promise<Job>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
