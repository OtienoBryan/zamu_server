export declare class CreateFinishedProductDto {
    name: string;
    description?: string;
    imageUrl?: string;
    imagePublicId?: string;
    sellingPrice: number;
    status?: 'active' | 'inactive';
    categoryId?: number | null;
    color?: string;
}
