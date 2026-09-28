export declare class CreateAppointmentDto {
    title: string;
    description?: string;
    location?: string;
    appointment_date: string;
    end_date?: string;
    conversion_client_id?: number;
    conversion_vehicle_id?: number;
    status?: 'scheduled' | 'completed' | 'cancelled';
}
