"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentNotificationsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const luxon_1 = require("luxon");
const whatsapp_service_1 = require("./whatsapp.service");
let AppointmentNotificationsService = class AppointmentNotificationsService {
    whatsApp;
    configService;
    constructor(whatsApp, configService) {
        this.whatsApp = whatsApp;
        this.configService = configService;
    }
    notifyClient(appointment, kind = 'scheduled') {
        this.send(appointment, kind).catch((error) => {
            console.error('❌ [AppointmentNotifications] Unexpected notification failure:', error);
        });
    }
    async send(appointment, kind = 'scheduled') {
        const client = appointment.conversionClient;
        if (!client) {
            return { sent: false, reason: 'no_client_linked' };
        }
        if (!client.contact) {
            console.warn(`⚠️ [AppointmentNotifications] Client ${client.id} has no contact number`);
            return { sent: false, reason: 'no_contact' };
        }
        const params = this.buildParams(appointment, kind);
        const useTemplate = (this.configService.get('WHATSAPP_USE_TEMPLATE') || 'true').toLowerCase() !== 'false';
        if (!useTemplate) {
            return this.whatsApp.sendText(client.contact, this.buildPlainText(appointment, kind, params));
        }
        const templateName = kind === 'rescheduled'
            ? this.configService.get('WHATSAPP_TEMPLATE_APPOINTMENT_UPDATED') ||
                this.configService.get('WHATSAPP_TEMPLATE_APPOINTMENT') ||
                'appointment_confirmation'
            : this.configService.get('WHATSAPP_TEMPLATE_APPOINTMENT') || 'appointment_confirmation';
        return this.whatsApp.sendTemplate(client.contact, templateName, params);
    }
    buildParams(appointment, kind) {
        const client = appointment.conversionClient;
        const name = client?.first_name?.trim() || client?.name?.trim() || 'Customer';
        const vehicle = appointment.conversionVehicle;
        const vehicleLabel = vehicle
            ? [vehicle.registration_number, [vehicle.make, vehicle.model].filter(Boolean).join(' ')]
                .filter(Boolean)
                .join(' - ')
            : '';
        const service = [appointment.title, vehicleLabel].filter(Boolean).join(' | ');
        return [
            name,
            service || 'Workshop appointment',
            this.formatWhen(appointment),
            appointment.location?.trim() || this.configService.get('WORKSHOP_NAME') || 'our workshop',
        ];
    }
    formatWhen(appointment) {
        const zone = this.configService.get('APP_TIMEZONE') || 'Africa/Nairobi';
        const start = luxon_1.DateTime.fromJSDate(new Date(appointment.appointment_date)).setZone(zone);
        const when = start.toFormat("cccc, d LLLL yyyy 'at' h:mm a");
        if (!appointment.end_date)
            return when;
        const end = luxon_1.DateTime.fromJSDate(new Date(appointment.end_date)).setZone(zone);
        return `${when} - ${end.toFormat('h:mm a')}`;
    }
    buildPlainText(appointment, kind, params) {
        const [name, service, when, where] = params;
        const lead = kind === 'rescheduled'
            ? `Hi ${name}, your appointment has been rescheduled.`
            : `Hi ${name}, your appointment has been booked.`;
        const lines = [lead, '', `Service: ${service}`, `When: ${when}`, `Where: ${where}`];
        if (appointment.description?.trim())
            lines.push(`Notes: ${appointment.description.trim()}`);
        lines.push('', 'Reply to this message if you need to make any changes.');
        return lines.join('\n');
    }
};
exports.AppointmentNotificationsService = AppointmentNotificationsService;
exports.AppointmentNotificationsService = AppointmentNotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [whatsapp_service_1.WhatsAppService,
        config_1.ConfigService])
], AppointmentNotificationsService);
//# sourceMappingURL=appointment-notifications.service.js.map