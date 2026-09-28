import { Station } from './station.entity';
export declare class FuelPrice {
    id: number;
    stationId: number;
    station?: Station;
    price: number;
    fuelType: string | null;
    startDate: string | null;
    endDate: string | null;
    notes: string | null;
    created_at: Date;
}
