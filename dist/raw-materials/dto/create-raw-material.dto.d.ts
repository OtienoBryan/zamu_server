export declare class CreateRawMaterialDto {
    name: string;
    categoryId?: number | null;
    unitOfMeasure: string;
    alertQuantity?: number;
    description?: string;
    cost: number;
    status?: 'active' | 'inactive';
}
