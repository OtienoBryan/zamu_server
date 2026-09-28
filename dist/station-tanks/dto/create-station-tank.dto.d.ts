export declare class CreateStationTankDto {
    station_id: number;
    name: string;
    capacity?: number;
    current_quantity?: number;
    status?: 'active' | 'inactive' | 'maintenance';
}
