export declare class CreateServiceDto {
    title: string;
    description?: string;
    rate: number;
    pricing_type: 'fixed' | 'hourly';
    is_active?: number;
}
