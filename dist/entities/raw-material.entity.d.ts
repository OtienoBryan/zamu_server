import { RawMaterialCategory } from './raw-material-category.entity';
export declare class RawMaterial {
    id: number;
    name: string;
    categoryId: number | null;
    category: RawMaterialCategory | null;
    unitOfMeasure: string;
    alertQuantity: number;
    description: string | null;
    cost: number;
    status: 'active' | 'inactive';
    createdAt: Date;
    updatedAt: Date;
}
