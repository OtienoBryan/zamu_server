import { Repository } from 'typeorm';
import { PartCategory } from '../entities/part-category.entity';
export declare class PartCategoriesService {
    private repo;
    constructor(repo: Repository<PartCategory>);
    findAll(): Promise<PartCategory[]>;
    findOne(id: number): Promise<PartCategory>;
    create(data: Partial<PartCategory>): Promise<PartCategory>;
    update(id: number, data: Partial<PartCategory>): Promise<PartCategory>;
    remove(id: number): Promise<void>;
}
