import { PartsService } from './parts.service';
import { Part } from '../entities/part.entity';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
export declare class PartsController {
    private readonly partsService;
    constructor(partsService: PartsService);
    findAll(): Promise<Part[]>;
    findOne(id: number): Promise<Part>;
    create(createPartDto: CreatePartDto): Promise<Part>;
    update(id: number, updatePartDto: UpdatePartDto): Promise<Part>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
