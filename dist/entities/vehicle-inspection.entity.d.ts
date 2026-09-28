import { ConversionVehicle } from './conversion-vehicle.entity';
import { ConversionClient } from './conversion-client.entity';
import { Staff } from './staff.entity';
export declare class VehicleInspection {
    id: number;
    conversion_vehicle_id: number;
    conversionVehicle?: ConversionVehicle;
    conversion_client_id: number;
    conversionClient?: ConversionClient;
    assigned_staff_id: number;
    technician?: Staff;
    inspection_date: string;
    status: 'pending' | 'in_progress' | 'completed';
    summary?: string | null;
    checklist?: string | null;
    issues_found: number;
    created_at: Date;
    updated_at: Date;
}
