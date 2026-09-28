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
exports.WhatsAppService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const https = __importStar(require("https"));
let WhatsAppService = class WhatsAppService {
    configService;
    apiVersion;
    phoneNumberId;
    accessToken;
    defaultCountryCode;
    constructor(configService) {
        this.configService = configService;
        this.apiVersion = this.configService.get('WHATSAPP_API_VERSION') || 'v21.0';
        this.phoneNumberId = this.configService.get('WHATSAPP_PHONE_NUMBER_ID');
        this.accessToken = this.configService.get('WHATSAPP_ACCESS_TOKEN');
        this.defaultCountryCode = this.configService.get('WHATSAPP_DEFAULT_COUNTRY_CODE') || '254';
    }
    get isConfigured() {
        const enabled = (this.configService.get('WHATSAPP_ENABLED') || 'true').toLowerCase() !== 'false';
        return enabled && !!this.phoneNumberId && !!this.accessToken;
    }
    normalizePhone(raw) {
        if (!raw)
            return null;
        let digits = String(raw).replace(/[^\d+]/g, '');
        if (digits.startsWith('+'))
            digits = digits.slice(1);
        digits = digits.replace(/\D/g, '');
        if (!digits)
            return null;
        if (digits.startsWith('00'))
            digits = digits.slice(2);
        if (digits.startsWith('0'))
            digits = this.defaultCountryCode + digits.slice(1);
        else if (digits.length <= 9)
            digits = this.defaultCountryCode + digits;
        return digits.length >= 10 && digits.length <= 15 ? digits : null;
    }
    async sendTemplate(to, templateName, bodyParams, languageCode) {
        return this.send(to, {
            type: 'template',
            template: {
                name: templateName,
                language: { code: languageCode || this.configService.get('WHATSAPP_TEMPLATE_LANG') || 'en' },
                components: bodyParams.length
                    ? [{ type: 'body', parameters: bodyParams.map((text) => ({ type: 'text', text })) }]
                    : [],
            },
        });
    }
    async sendText(to, body) {
        return this.send(to, { type: 'text', text: { preview_url: false, body } });
    }
    async send(to, message) {
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
            const req = https.request(url, {
                method: 'POST',
                headers: {
                    authorization: `Bearer ${this.accessToken}`,
                    'content-type': 'application/json',
                    'content-length': Buffer.byteLength(payload),
                },
            }, (res) => {
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    let parsed = {};
                    try {
                        parsed = JSON.parse(data);
                    }
                    catch {
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
            });
            req.on('error', (error) => {
                console.error(`❌ [WhatsAppService] Request failed for ${recipient}:`, error);
                resolve({ sent: false, reason: error.message });
            });
            req.write(payload);
            req.end();
        });
    }
};
exports.WhatsAppService = WhatsAppService;
exports.WhatsAppService = WhatsAppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], WhatsAppService);
//# sourceMappingURL=whatsapp.service.js.map