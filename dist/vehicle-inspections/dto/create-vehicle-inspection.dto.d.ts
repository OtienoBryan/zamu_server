export declare class CreateVehicleInspectionDto {
    conversion_vehicle_id: number;
    conversion_client_id: number;
    assigned_staff_id: number;
    inspection_date: string;
    status?: 'pending' | 'in_progress' | 'completed';
    summary?: string;
    checklist?: string;
    issues_found?: number;
}
