export declare class Service {
    id: number;
    title: string;
    description?: string | null;
    rate: number;
    pricing_type: 'fixed' | 'hourly';
    is_active: number;
    created_at: Date;
    updated_at: Date;
}
