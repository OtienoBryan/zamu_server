import { RawMaterialsService } from './raw-materials.service';
import { RawMaterial } from '../entities/raw-material.entity';
import { RawMaterialCategory } from '../entities/raw-material-category.entity';
import { CreateRawMaterialDto } from './dto/create-raw-material.dto';
import { UpdateRawMaterialDto } from './dto/update-raw-material.dto';
export declare class RawMaterialsController {
    private readonly rawMaterialsService;
    constructor(rawMaterialsService: RawMaterialsService);
    findAllCategories(): Promise<RawMaterialCategory[]>;
    createCategory(name: string): Promise<RawMaterialCategory>;
    updateCategory(id: number, name: string): Promise<RawMaterialCategory>;
    removeCategory(id: number): Promise<{
        message: string;
    }>;
    findAll(): Promise<RawMaterial[]>;
    findOne(id: number): Promise<RawMaterial>;
    create(dto: CreateRawMaterialDto): Promise<RawMaterial>;
    update(id: number, dto: UpdateRawMaterialDto): Promise<RawMaterial>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
