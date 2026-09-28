import { Station } from './station.entity';
export declare class StationTank {
    id: number;
    station_id: number;
    station?: Station;
    name: string;
    capacity: number;
    current_quantity: number;
    status: 'active' | 'inactive' | 'maintenance';
    created_at: Date;
    updated_at: Date;
}
