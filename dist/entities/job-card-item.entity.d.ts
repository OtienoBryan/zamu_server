import { JobCard } from './job-card.entity';
import { Part } from './part.entity';
import { Service } from './service.entity';
import { Staff } from './staff.entity';
export declare class JobCardItem {
    id: number;
    job_card_id: number;
    jobCard?: JobCard;
    item_type: 'part' | 'labor';
    part_id?: number | null;
    part?: Part;
    service_id?: number | null;
    service?: Service;
    assigned_staff_id?: number | null;
    assignedStaff?: Staff;
    assigned_at?: Date | null;
    description: string;
    cost: number;
    price: number;
    quantity: number;
    taxable: number;
    amount: number;
    created_at: Date;
}
