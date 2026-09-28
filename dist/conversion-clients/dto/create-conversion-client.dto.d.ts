export declare class CreateConversionClientDto {
    name: string;
    first_name?: string;
    middle_name?: string;
    surname?: string;
    email?: string;
    contact: string;
    address?: string;
    description?: string;
    region?: string;
    category?: 'individual' | 'company';
    organization_type?: 'individual' | 'sacco' | 'company';
    organization_name?: string;
    tax_pin?: string;
    referral_source?: string;
    referral_notes?: string;
    tax_exempt?: number;
    apply_discount?: number;
    discount_rate?: number;
    labour_rate_override?: number;
    labour_rate?: number;
    parts_markup_override?: number;
    parts_markup?: number;
    payment_terms_override?: number;
    payment_terms?: string;
    is_active?: number;
}
