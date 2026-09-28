export declare class VehicleDocumentDto {
    title: string;
    url: string;
}
export declare class CreateConversionVehicleDto {
    conversion_client_id: number;
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
    odo_unit?: 'KM' | 'Miles';
    color?: string;
    unit_number?: string;
    tank_capacity?: string;
    tank_year_of_production?: number;
    tank_serial_number?: string;
    kit_serial_number?: string;
    telemetry_status?: string;
    notes?: string;
    photo_url?: string;
    photo_urls?: string[];
    vsa_url?: string;
    logbook_url?: string;
    documents?: VehicleDocumentDto[];
    labels?: string[];
}
