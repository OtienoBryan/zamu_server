import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DateTime } from 'luxon';
import { Appointment } from '../entities/appointment.entity';
import { WhatsAppService, WhatsAppSendResult } from './whatsapp.service';

type NotificationKind = 'scheduled' | 'rescheduled';

@Injectable()
export class AppointmentNotificationsService {
  constructor(
    private readonly whatsApp: WhatsAppService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Fire-and-forget wrapper: notifying the client must never fail the booking itself.
   */
  notifyClient(appointment: Appointment, kind: NotificationKind = 'scheduled'): void {
    this.send(appointment, kind).catch((error) => {
      console.error('❌ [AppointmentNotifications] Unexpected notification failure:', error);
    });
  }

  async send(appointment: Appointment, kind: NotificationKind = 'scheduled'): Promise<WhatsAppSendResult> {
    const client = appointment.conversionClient;
    if (!client) {
      return { sent: false, reason: 'no_client_linked' };
    }
    if (!client.contact) {
      console.warn(`⚠️ [AppointmentNotifications] Client ${client.id} has no contact number`);
      return { sent: false, reason: 'no_contact' };
    }

    const params = this.buildParams(appointment, kind);

    const useTemplate = (this.configService.get<string>('WHATSAPP_USE_TEMPLATE') || 'true').toLowerCase() !== 'false';
    if (!useTemplate) {
      return this.whatsApp.sendText(client.contact, this.buildPlainText(appointment, kind, params));
    }

    const templateName =
      kind === 'rescheduled'
        ? this.configService.get<string>('WHATSAPP_TEMPLATE_APPOINTMENT_UPDATED') ||
          this.configService.get<string>('WHATSAPP_TEMPLATE_APPOINTMENT') ||
          'appointment_confirmation'
        : this.configService.get<string>('WHATSAPP_TEMPLATE_APPOINTMENT') || 'appointment_confirmation';

    return this.whatsApp.sendTemplate(client.contact, templateName, params);
  }

  /** Template body placeholders, in order: {{1}} name, {{2}} service, {{3}} when, {{4}} where. */
  private buildParams(appointment: Appointment, kind: NotificationKind): string[] {
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
      appointment.location?.trim() || this.configService.get<string>('WORKSHOP_NAME') || 'our workshop',
    ];
  }

  private formatWhen(appointment: Appointment): string {
    const zone = this.configService.get<string>('APP_TIMEZONE') || 'Africa/Nairobi';
    const start = DateTime.fromJSDate(new Date(appointment.appointment_date)).setZone(zone);
    const when = start.toFormat("cccc, d LLLL yyyy 'at' h:mm a");

    if (!appointment.end_date) return when;

    const end = DateTime.fromJSDate(new Date(appointment.end_date)).setZone(zone);
    return `${when} - ${end.toFormat('h:mm a')}`;
  }

  private buildPlainText(appointment: Appointment, kind: NotificationKind, params: string[]): string {
    const [name, service, when, where] = params;
    const lead =
      kind === 'rescheduled'
        ? `Hi ${name}, your appointment has been rescheduled.`
        : `Hi ${name}, your appointment has been booked.`;

    const lines = [lead, '', `Service: ${service}`, `When: ${when}`, `Where: ${where}`];
    if (appointment.description?.trim()) lines.push(`Notes: ${appointment.description.trim()}`);
    lines.push('', 'Reply to this message if you need to make any changes.');

    return lines.join('\n');
  }
}
