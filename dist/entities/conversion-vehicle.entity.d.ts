import { ConversionClient } from './conversion-client.entity';
export declare class ConversionVehicle {
    id: number;
    conversion_client_id: number;
    conversionClient?: ConversionClient;
    registration_number: string;
    vin_serial_number?: string;
    vehicle_type?: string;
    year?: number;
    make?: string;
    model: string;
    trim_option?: string;
    transmission_type?: string;
    driven_wheel?: string;
    engine?: string;
    engine_capacity?: string;
    engine_code?: string;
    current_odo?: number;
    odo_unit: 'KM' | 'Miles';
    color?: string;
    unit_number?: string;
    tank_capacity?: string;
    tank_year_of_production?: number;
    tank_serial_number?: string;
    kit_serial_number?: string;
    telemetry_status?: string;
    notes?: string;
    photo_url?: string | null;
    vsa_url?: string | null;
    logbook_url?: string | null;
    documents?: {
        title: string;
        url: string;
    }[];
    photo_urls?: string[];
    labels?: string[];
    created_at: Date;
    updated_at: Date;
}
