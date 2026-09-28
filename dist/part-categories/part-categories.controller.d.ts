import { PartCategoriesService } from './part-categories.service';
import { PartCategory } from '../entities/part-category.entity';
export declare class PartCategoriesController {
    private readonly service;
    constructor(service: PartCategoriesService);
    findAll(): Promise<PartCategory[]>;
    findOne(id: number): Promise<PartCategory>;
    create(body: Partial<PartCategory>): Promise<PartCategory>;
    update(id: number, body: Partial<PartCategory>): Promise<PartCategory>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
