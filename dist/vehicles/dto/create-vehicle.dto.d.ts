export declare class CreateVehicleDto {
    key_account_id: number;
    registration_number: string;
    vin_serial_number?: string;
    vehicle_type?: string;
    year?: number;
    make?: string;
    model: string;
    trim_option?: string;
    transmission_type?: string;
    driven_wheel?: string;
    current_odo?: number;
    color?: string;
    driver_name: string;
    driver_contact: string;
}
