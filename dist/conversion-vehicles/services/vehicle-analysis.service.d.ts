import { ConfigService } from '@nestjs/config';
import { VehicleAnalysisResult } from '../dto/analyze-vehicle-image.dto';
export declare class VehicleAnalysisService {
    private configService;
    private anthropicApiKey;
    private apiUrl;
    constructor(configService: ConfigService);
    analyzeVehicleImage(imageUrl: string): Promise<VehicleAnalysisResult>;
    private callClaudeApi;
}
