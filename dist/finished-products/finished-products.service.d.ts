import { Repository } from 'typeorm';
import { FinishedProduct } from '../entities/finished-product.entity';
import { FinishedProductCategory } from '../entities/finished-product-category.entity';
import { FinishedProductMaterial } from '../entities/finished-product-material.entity';
import { RawMaterial } from '../entities/raw-material.entity';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CreateFinishedProductDto } from './dto/create-finished-product.dto';
import { UpdateFinishedProductDto } from './dto/update-finished-product.dto';
import { AddMaterialDto } from './dto/add-material.dto';
import { UpdateMaterialQuantityDto } from './dto/update-material-quantity.dto';
export declare class FinishedProductsService {
    private productRepository;
    private categoryRepository;
    private materialRepository;
    private rawMaterialRepository;
    private cloudinaryService;
    constructor(productRepository: Repository<FinishedProduct>, categoryRepository: Repository<FinishedProductCategory>, materialRepository: Repository<FinishedProductMaterial>, rawMaterialRepository: Repository<RawMaterial>, cloudinaryService: CloudinaryService);
    findAll(): Promise<FinishedProduct[]>;
    findOne(id: number): Promise<FinishedProduct>;
    create(dto: CreateFinishedProductDto): Promise<FinishedProduct>;
    update(id: number, dto: UpdateFinishedProductDto): Promise<FinishedProduct>;
    remove(id: number): Promise<void>;
    uploadImage(file: Express.Multer.File): Promise<{
        url: string;
        publicId: string;
    }>;
    findAllCategories(): Promise<FinishedProductCategory[]>;
    createCategory(name: string): Promise<FinishedProductCategory>;
    private ensureCategoryExists;
    findMaterials(productId: number): Promise<FinishedProductMaterial[]>;
    addMaterial(productId: number, dto: AddMaterialDto): Promise<FinishedProductMaterial[]>;
    updateMaterialQuantity(productId: number, lineId: number, dto: UpdateMaterialQuantityDto): Promise<FinishedProductMaterial[]>;
    removeMaterial(productId: number, lineId: number): Promise<FinishedProductMaterial[]>;
    private recomputeProductionCost;
}
