import { Station } from './station.entity';
import { Staff } from './staff.entity';
export declare class StationLpgLedger {
    id: number;
    stationId: number;
    station?: Station;
    transactionType: 'IN' | 'OUT' | 'ADJUSTMENT';
    quantityIn: number;
    quantityOut: number;
    balance: number;
    quantity: number;
    previousQuantity: number;
    newQuantity: number;
    referenceNumber?: string | null;
    notes?: string | null;
    createdBy?: number | null;
    createdByStaff?: Staff;
    created_at: Date;
}
