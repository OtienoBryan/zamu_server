import { CreateJobCardItemDto } from './create-job-card-item.dto';
export declare class CreateJobCardDto {
    conversion_client_id?: number;
    conversion_vehicle_id?: number;
    status?: 'open' | 'sent' | 'approved' | 'not_paid' | 'paid' | 'warranty' | 'special_order' | 'written_off' | 'voided';
    vat_enabled?: number;
    vat_rate?: number;
    discount?: number;
    other_charges?: number;
    amount_paid?: number;
    notes?: string;
    items?: CreateJobCardItemDto[];
}
