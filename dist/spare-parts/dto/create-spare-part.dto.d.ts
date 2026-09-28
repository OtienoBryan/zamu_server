export declare class CreateSparePartDto {
    name: string;
    categoryId?: number | null;
    partNumber?: string;
    unitOfMeasure: string;
    quantity?: number;
    alertQuantity?: number;
    cost?: number;
    description?: string;
    status?: 'active' | 'inactive';
}
