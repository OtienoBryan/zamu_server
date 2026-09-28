import { CategoriesService } from './categories.service';
import { Category } from '../entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    findAll(): Promise<Category[]>;
    create(createCategoryDto: CreateCategoryDto): Promise<Category>;
    update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
