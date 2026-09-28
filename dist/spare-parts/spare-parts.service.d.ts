import { Repository } from 'typeorm';
import { SparePart } from '../entities/spare-part.entity';
import { SparePartCategory } from '../entities/spare-part-category.entity';
import { CreateSparePartDto } from './dto/create-spare-part.dto';
import { UpdateSparePartDto } from './dto/update-spare-part.dto';
export declare class SparePartsService {
    private sparePartRepository;
    private categoryRepository;
    constructor(sparePartRepository: Repository<SparePart>, categoryRepository: Repository<SparePartCategory>);
    findAll(): Promise<SparePart[]>;
    findOne(id: number): Promise<SparePart>;
    create(dto: CreateSparePartDto): Promise<SparePart>;
    update(id: number, dto: UpdateSparePartDto): Promise<SparePart>;
    remove(id: number): Promise<void>;
    findAllCategories(): Promise<SparePartCategory[]>;
    createCategory(name: string): Promise<SparePartCategory>;
    updateCategory(id: number, name: string): Promise<SparePartCategory>;
    removeCategory(id: number): Promise<void>;
    private ensureCategoryExists;
}
