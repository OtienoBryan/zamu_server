import { FinishedProductCategory } from './finished-product-category.entity';
export declare class FinishedProduct {
    id: number;
    name: string;
    description: string | null;
    imageUrl: string | null;
    imagePublicId: string | null;
    sellingPrice: number;
    productionCost: number;
    status: 'active' | 'inactive';
    categoryId: number | null;
    color: string | null;
    category: FinishedProductCategory | null;
    createdAt: Date;
    updatedAt: Date;
}
