import { FinishedProduct } from './finished-product.entity';
export type JobStatus = 'open' | 'completed' | 'cancelled';
export declare class Job {
    id: number;
    productId: number | null;
    product: FinishedProduct | null;
    quantity: number | null;
    startDate: string | null;
    expectedEndDate: string | null;
    notes: string | null;
    status: JobStatus;
    createdAt: Date;
    updatedAt: Date;
}
