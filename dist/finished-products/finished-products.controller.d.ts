import { FinishedProductsService } from './finished-products.service';
import { FinishedProduct } from '../entities/finished-product.entity';
import { FinishedProductCategory } from '../entities/finished-product-category.entity';
import { FinishedProductMaterial } from '../entities/finished-product-material.entity';
import { CreateFinishedProductDto } from './dto/create-finished-product.dto';
import { UpdateFinishedProductDto } from './dto/update-finished-product.dto';
import { AddMaterialDto } from './dto/add-material.dto';
import { UpdateMaterialQuantityDto } from './dto/update-material-quantity.dto';
export declare class FinishedProductsController {
    private readonly finishedProductsService;
    constructor(finishedProductsService: FinishedProductsService);
    findAllCategories(): Promise<FinishedProductCategory[]>;
    createCategory(name: string): Promise<FinishedProductCategory>;
    uploadImage(file: Express.Multer.File): Promise<{
        url: string;
        publicId: string;
    }>;
    findAll(): Promise<FinishedProduct[]>;
    findOne(id: number): Promise<FinishedProduct>;
    create(dto: CreateFinishedProductDto): Promise<FinishedProduct>;
    update(id: number, dto: UpdateFinishedProductDto): Promise<FinishedProduct>;
    remove(id: number): Promise<{
        message: string;
    }>;
    findMaterials(id: number): Promise<FinishedProductMaterial[]>;
    addMaterial(id: number, dto: AddMaterialDto): Promise<FinishedProductMaterial[]>;
    updateMaterialQuantity(id: number, lineId: number, dto: UpdateMaterialQuantityDto): Promise<FinishedProductMaterial[]>;
    removeMaterial(id: number, lineId: number): Promise<FinishedProductMaterial[]>;
}
