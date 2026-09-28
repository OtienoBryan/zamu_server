import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { VehicleAnalysisResult } from '../dto/analyze-vehicle-image.dto';
import * as https from 'https';

@Injectable()
export class VehicleAnalysisService {
  private anthropicApiKey: string | undefined;
  private apiUrl = 'https://api.anthropic.com/v1/messages';

  constructor(private configService: ConfigService) {
    this.anthropicApiKey = this.configService.get<string>('ANTHROPIC_API_KEY');
  }

  async analyzeVehicleImage(imageUrl: string): Promise<VehicleAnalysisResult> {
    console.log('🚗 [VehicleAnalysisService] Starting vehicle analysis for image:', imageUrl);

    if (!this.anthropicApiKey) {
      console.error('❌ [VehicleAnalysisService] ANTHROPIC_API_KEY not configured');
      throw new HttpException(
        'ANTHROPIC_API_KEY not configured',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
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
    } catch (error) {
      console.error('❌ [VehicleAnalysisService] Vehicle image analysis error:', error);
      throw new HttpException(
        `Failed to analyze vehicle image: ${(error as any).message || 'Unknown error'}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async callClaudeApi(
    imageUrl: string,
    prompt: string,
  ): Promise<VehicleAnalysisResult> {
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
      const req = https.request(
        this.apiUrl,
        {
          method: 'POST',
          headers: {
            'x-api-key': this.anthropicApiKey,
            'anthropic-version': '2023-06-01',
            'content-type': 'application/json',
          },
        },
        (res) => {
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
                reject(
                  new Error(
                    `API error (${res.statusCode}): ${errorMsg}`,
                  ),
                );
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
              } catch (parseErr) {
                console.error('❌ [VehicleAnalysisService] Failed to parse analysis JSON:', content.text);
                reject(new Error(`Failed to parse analysis response: ${(parseErr as any).message}`));
              }
            } catch (err) {
              console.error('❌ [VehicleAnalysisService] Failed to parse API response:', err);
              reject(new Error(`Failed to parse API response: ${(err as any).message}`));
            }
          });
        },
      );

      req.on('error', (error) => {
        console.error('❌ [VehicleAnalysisService] Request error:', error);
        reject(error);
      });

      req.write(JSON.stringify(payload));
      req.end();
    });
  }
}
