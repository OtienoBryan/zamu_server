import { ConfigService } from '@nestjs/config';
import { Appointment } from '../entities/appointment.entity';
import { WhatsAppService, WhatsAppSendResult } from './whatsapp.service';
type NotificationKind = 'scheduled' | 'rescheduled';
export declare class AppointmentNotificationsService {
    private readonly whatsApp;
    private readonly configService;
    constructor(whatsApp: WhatsAppService, configService: ConfigService);
    notifyClient(appointment: Appointment, kind?: NotificationKind): void;
    send(appointment: Appointment, kind?: NotificationKind): Promise<WhatsAppSendResult>;
    private buildParams;
    private formatWhen;
    private buildPlainText;
}
export {};
