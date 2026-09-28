export declare class CreateJobCardPaymentDto {
    amount: number;
    payment_method: 'cash' | 'mobile_money' | 'card' | 'bank_transfer' | 'cheque' | 'other';
    reference?: string;
    payment_date: string;
    notes?: string;
}
