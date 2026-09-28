import { SparePartCategory } from './spare-part-category.entity';
export declare class SparePart {
    id: number;
    name: string;
    categoryId: number | null;
    category: SparePartCategory | null;
    partNumber: string | null;
    unitOfMeasure: string;
    quantity: number;
    alertQuantity: number;
    cost: number;
    description: string | null;
    status: 'active' | 'inactive';
    createdAt: Date;
    updatedAt: Date;
}
