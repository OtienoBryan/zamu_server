import { Station } from './station.entity';
import { Staff } from './staff.entity';
export declare class StationExpense {
    id: number;
    user_id: number;
    user?: Staff;
    station_id: number;
    station?: Station;
    amount: number;
    expense_date: string;
    comment: string;
    payment_method: string;
    created_at: Date;
}
