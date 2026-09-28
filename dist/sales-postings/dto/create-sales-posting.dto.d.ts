export declare class CreateSalesPostingDto {
    station_id: number;
    period_start: string;
    period_end: string;
    cash_posted: number;
    card_posted: number;
    mpesa_posted: number;
    credit_posted: number;
    other_posted: number;
    cash_system: number;
    card_system: number;
    mpesa_system: number;
    credit_system: number;
    other_system: number;
    notes?: string;
}
