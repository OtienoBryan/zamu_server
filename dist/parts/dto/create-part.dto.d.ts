export declare class CreatePartDto {
    part_number: string;
    name: string;
    description?: string;
    category?: string;
    manufacturer?: string;
    unit_price?: number;
    unit_price_usd?: number;
    stock_quantity?: number;
    min_stock_level?: number;
    location?: string;
    unit?: string;
    purchase_cost?: number;
    selling_price: number;
    selling_price_usd: number;
    status?: string;
    notes?: string;
    image_url?: string;
}
