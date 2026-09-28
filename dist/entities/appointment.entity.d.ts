import { ConversionClient } from './conversion-client.entity';
import { ConversionVehicle } from './conversion-vehicle.entity';
export declare class Appointment {
    id: number;
    title: string;
    description?: string | null;
    location?: string | null;
    appointment_date: Date;
    end_date?: Date | null;
    conversion_client_id?: number | null;
    conversionClient?: ConversionClient;
    conversion_vehicle_id?: number | null;
    conversionVehicle?: ConversionVehicle;
    status: 'scheduled' | 'completed' | 'cancelled';
    created_by?: number | null;
    created_at: Date;
    updated_at: Date;
}
