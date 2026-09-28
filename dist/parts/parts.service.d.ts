import { Repository } from 'typeorm';
import { Part } from '../entities/part.entity';
import { PartInventory } from '../entities/part-inventory.entity';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
export declare class PartsService {
    private partRepository;
    private partInventoryRepository;
    constructor(partRepository: Repository<Part>, partInventoryRepository: Repository<PartInventory>);
    private getTotalStockByPartId;
    private getTotalStockForPart;
    findAll(): Promise<Part[]>;
    findOne(id: number): Promise<Part>;
    create(createPartDto: CreatePartDto): Promise<Part>;
    update(id: number, updatePartDto: UpdatePartDto): Promise<Part>;
    remove(id: number): Promise<void>;
}
