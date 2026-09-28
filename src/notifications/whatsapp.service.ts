import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as https from 'https';

export interface WhatsAppSendResult {
  sent: boolean;
  messageId?: string;
  reason?: string;
}

/**
 * Transport for the Meta WhatsApp Cloud API (Graph API).
 *
 * Business-initiated messages outside the 24h customer service window must use an
 * approved message template, so sendTemplate() is the default path. sendText() is
 * kept for replies inside an open window and for local testing.
 */
@Injectable()
export class WhatsAppService {
  private readonly apiVersion: string;
  private readonly phoneNumberId: string | undefined;
  private readonly accessToken: string | undefined;
  private readonly defaultCountryCode: string;

  constructor(private configService: ConfigService) {
    this.apiVersion = this.configService.get<string>('WHATSAPP_API_VERSION') || 'v21.0';
    this.phoneNumberId = this.configService.get<string>('WHATSAPP_PHONE_NUMBER_ID');
    this.accessToken = this.configService.get<string>('WHATSAPP_ACCESS_TOKEN');
    this.defaultCountryCode = this.configService.get<string>('WHATSAPP_DEFAULT_COUNTRY_CODE') || '254';
  }

  get isConfigured(): boolean {
    const enabled = (this.configService.get<string>('WHATSAPP_ENABLED') || 'true').toLowerCase() !== 'false';
    return enabled && !!this.phoneNumberId && !!this.accessToken;
  }

  /**
   * Turns locally formatted numbers into the digits-only E.164 form the API expects.
   * "0712 345 678" -> "254712345678", "+254712345678" -> "254712345678".
   */
  normalizePhone(raw: string | null | undefined): string | null {
    if (!raw) return null;

    let digits = String(raw).replace(/[^\d+]/g, '');
    if (digits.startsWith('+')) digits = digits.slice(1);
    digits = digits.replace(/\D/g, '');
    if (!digits) return null;

    if (digits.startsWith('00')) digits = digits.slice(2);
    if (digits.startsWith('0')) digits = this.defaultCountryCode + digits.slice(1);
    else if (digits.length <= 9) digits = this.defaultCountryCode + digits;

    return digits.length >= 10 && digits.length <= 15 ? digits : null;
  }

  async sendTemplate(
    to: string,
    templateName: string,
    bodyParams: string[],
    languageCode?: string,
  ): Promise<WhatsAppSendResult> {
    return this.send(to, {
      type: 'template',
      template: {
        name: templateName,
        language: { code: languageCode || this.configService.get<string>('WHATSAPP_TEMPLATE_LANG') || 'en' },
        components: bodyParams.length
          ? [{ type: 'body', parameters: bodyParams.map((text) => ({ type: 'text', text })) }]
          : [],
      },
    });
  }

  async sendText(to: string, body: string): Promise<WhatsAppSendResult> {
    return this.send(to, { type: 'text', text: { preview_url: false, body } });
  }

  private async send(to: string, message: Record<string, unknown>): Promise<WhatsAppSendResult> {
    if (!this.isConfigured) {
      console.warn('⚠️ [WhatsAppService] Not configured (WHATSAPP_PHONE_NUMBER_ID / WHATSAPP_ACCESS_TOKEN) - skipping send');
      return { sent: false, reason: 'not_configured' };
    }

    const recipient = this.normalizePhone(to);
    if (!recipient) {
      console.warn(`⚠️ [WhatsAppService] Unusable phone number "${to}" - skipping send`);
      return { sent: false, reason: 'invalid_phone' };
    }

    const payload = JSON.stringify({ messaging_product: 'whatsapp', to: recipient, ...message });
    const url = `https://graph.facebook.com/${this.apiVersion}/${this.phoneNumberId}/messages`;

    return new Promise((resolve) => {
      const req = https.request(
        url,
        {
          method: 'POST',
          headers: {
            authorization: `Bearer ${this.accessToken}`,
            'content-type': 'application/json',
            'content-length': Buffer.byteLength(payload),
          },
        },
        (res) => {
          let data = '';
          res.on('data', (chunk) => {
            data += chunk;
          });
          res.on('end', () => {
            let parsed: any = {};
            try {
              parsed = JSON.parse(data);
            } catch {
              parsed = { raw: data };
            }

            if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
              const messageId = parsed?.messages?.[0]?.id;
              console.log(`✅ [WhatsAppService] Message sent to ${recipient} (${messageId ?? 'no id'})`);
              resolve({ sent: true, messageId });
              return;
            }

            const errorMsg = parsed?.error?.message || JSON.stringify(parsed);
            console.error(`❌ [WhatsAppService] API error (${res.statusCode}) for ${recipient}: ${errorMsg}`);
            resolve({ sent: false, reason: errorMsg });
          });
        },
      );

      req.on('error', (error) => {
        console.error(`❌ [WhatsAppService] Request failed for ${recipient}:`, error);
        resolve({ sent: false, reason: (error as Error).message });
      });

      req.write(payload);
      req.end();
    });
  }
}
