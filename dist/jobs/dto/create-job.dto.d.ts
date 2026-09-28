export declare class CreateJobDto {
    productId: number;
    quantity: number;
    startDate: string;
    expectedEndDate: string;
    notes?: string;
    status?: 'open' | 'completed' | 'cancelled';
}
