import { ConfigService } from '@nestjs/config';
export interface WhatsAppSendResult {
    sent: boolean;
    messageId?: string;
    reason?: string;
}
export declare class WhatsAppService {
    private configService;
    private readonly apiVersion;
    private readonly phoneNumberId;
    private readonly accessToken;
    private readonly defaultCountryCode;
    constructor(configService: ConfigService);
    get isConfigured(): boolean;
    normalizePhone(raw: string | null | undefined): string | null;
    sendTemplate(to: string, templateName: string, bodyParams: string[], languageCode?: string): Promise<WhatsAppSendResult>;
    sendText(to: string, body: string): Promise<WhatsAppSendResult>;
    private send;
}
