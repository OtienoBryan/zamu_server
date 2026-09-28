"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleAnalysisService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const https = __importStar(require("https"));
let VehicleAnalysisService = class VehicleAnalysisService {
    configService;
    anthropicApiKey;
    apiUrl = 'https://api.anthropic.com/v1/messages';
    constructor(configService) {
        this.configService = configService;
        this.anthropicApiKey = this.configService.get('ANTHROPIC_API_KEY');
    }
    async analyzeVehicleImage(imageUrl) {
        console.log('🚗 [VehicleAnalysisService] Starting vehicle analysis for image:', imageUrl);
        if (!this.anthropicApiKey) {
            console.error('❌ [VehicleAnalysisService] ANTHROPIC_API_KEY not configured');
            throw new common_1.HttpException('ANTHROPIC_API_KEY not configured', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        const prompt = `Analyze this vehicle image and extract the following details if visible:
- License plate / registration number
- VIN or serial number (if visible on windshield or door)
- Vehicle type (sedan, SUV, truck, etc.)
- Year (if visible on badge or from body style)
- Make (brand)
- Model
- Trim level (if visible)
- Transmission type (if visible)
- Drive type (FWD, RWD, AWD, 4WD if visible)
- Engine size/type (if visible on badge)
- Color

Return your response as a JSON object with these exact field names:
{
  "registration_number": "value or null",
  "vin_serial_number": "value or null",
  "vehicle_type": "value or null",
  "year": number or null,
  "make": "value or null",
  "model": "value or null",
  "trim_option": "value or null",
  "transmission_type": "value or null",
  "driven_wheel": "value or null",
  "engine": "value or null",
  "color": "value or null",
  "confidence": "high" | "medium" | "low",
  "extractedDetails": ["list of details found"]
}

Only return the JSON object, no other text.`;
        try {
            const response = await this.callClaudeApi(imageUrl, prompt);
            console.log('✅ [VehicleAnalysisService] Analysis complete:', response);
            return response;
        }
        catch (error) {
            console.error('❌ [VehicleAnalysisService] Vehicle image analysis error:', error);
            throw new common_1.HttpException(`Failed to analyze vehicle image: ${error.message || 'Unknown error'}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async callClaudeApi(imageUrl, prompt) {
        const payload = {
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 1024,
            messages: [
                {
                    role: 'user',
                    content: [
                        {
                            type: 'image',
                            source: {
                                type: 'url',
                                url: imageUrl,
                            },
                        },
                        {
                            type: 'text',
                            text: prompt,
                        },
                    ],
                },
            ],
        };
        console.log('📡 [VehicleAnalysisService] Sending request to Anthropic API...');
        return new Promise((resolve, reject) => {
            const req = https.request(this.apiUrl, {
                method: 'POST',
                headers: {
                    'x-api-key': this.anthropicApiKey,
                    'anthropic-version': '2023-06-01',
                    'content-type': 'application/json',
                },
            }, (res) => {
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    try {
                        const response = JSON.parse(data);
                        console.log(`📡 [VehicleAnalysisService] API Response Status: ${res.statusCode}`);
                        if (res.statusCode !== 200) {
                            const errorMsg = response.error?.message || JSON.stringify(response);
                            console.error(`❌ [VehicleAnalysisService] API Error (${res.statusCode}):`, errorMsg);
                            reject(new Error(`API error (${res.statusCode}): ${errorMsg}`));
                            return;
                        }
                        const content = response.content[0];
                        if (!content || content.type !== 'text') {
                            console.error('❌ [VehicleAnalysisService] Unexpected response format:', response);
                            reject(new Error('Unexpected response format: no text content'));
                            return;
                        }
                        try {
                            const analysisResult = JSON.parse(content.text);
                            console.log('✅ [VehicleAnalysisService] Successfully parsed analysis result');
                            resolve(analysisResult);
                        }
                        catch (parseErr) {
                            console.error('❌ [VehicleAnalysisService] Failed to parse analysis JSON:', content.text);
                            reject(new Error(`Failed to parse analysis response: ${parseErr.message}`));
                        }
                    }
                    catch (err) {
                        console.error('❌ [VehicleAnalysisService] Failed to parse API response:', err);
                        reject(new Error(`Failed to parse API response: ${err.message}`));
                    }
                });
            });
            req.on('error', (error) => {
                console.error('❌ [VehicleAnalysisService] Request error:', error);
                reject(error);
            });
            req.write(JSON.stringify(payload));
            req.end();
        });
    }
};
exports.VehicleAnalysisService = VehicleAnalysisService;
exports.VehicleAnalysisService = VehicleAnalysisService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], VehicleAnalysisService);
//# sourceMappingURL=vehicle-analysis.service.js.map