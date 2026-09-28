export declare class AnalyzeVehicleImageDto {
    imageUrl: string;
}
export declare class VehicleAnalysisResult {
    registration_number?: string;
    vin_serial_number?: string;
    vehicle_type?: string;
    year?: number;
    make?: string;
    model?: string;
    trim_option?: string;
    transmission_type?: string;
    driven_wheel?: string;
    engine?: string;
    color?: string;
    confidence: 'high' | 'medium' | 'low';
    extractedDetails: string[];
}
