import { Module } from '@nestjs/common';
import { WhatsAppService } from './whatsapp.service';
import { AppointmentNotificationsService } from './appointment-notifications.service';

@Module({
  providers: [WhatsAppService, AppointmentNotificationsService],
  exports: [WhatsAppService, AppointmentNotificationsService],
})
export class NotificationsModule {}
