import { JobCard } from './job-card.entity';
import { Staff } from './staff.entity';
export declare class JobCardPayment {
    id: number;
    job_card_id: number;
    jobCard?: JobCard;
    amount: number;
    payment_method: 'cash' | 'mobile_money' | 'card' | 'bank_transfer' | 'cheque' | 'other';
    reference?: string | null;
    payment_date: string;
    notes?: string | null;
    posted_by?: number | null;
    postedBy?: Staff;
    created_at: Date;
}
