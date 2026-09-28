export declare class CreateJobCardItemDto {
    item_type: 'part' | 'labor';
    part_id?: number;
    service_id?: number;
    assigned_staff_id?: number;
    assigned_at?: string;
    description: string;
    cost?: number;
    price: number;
    quantity: number;
    taxable?: number;
    amount: number;
}
