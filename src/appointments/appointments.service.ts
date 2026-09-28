import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from '../entities/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { AppointmentNotificationsService } from '../notifications/appointment-notifications.service';

const RELATIONS = ['conversionClient', 'conversionVehicle'];

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
    private notifications: AppointmentNotificationsService,
  ) {}

  async findAll(): Promise<Appointment[]> {
    return this.appointmentRepository.find({
      relations: RELATIONS,
      order: { appointment_date: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOne({
      where: { id },
      relations: RELATIONS,
    });

    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }

    return appointment;
  }

  async create(dto: CreateAppointmentDto): Promise<Appointment> {
    const appointment = this.appointmentRepository.create({
      title: dto.title,
      description: dto.description ?? null,
      location: dto.location ?? null,
      appointment_date: new Date(dto.appointment_date),
      end_date: dto.end_date ? new Date(dto.end_date) : null,
      conversion_client_id: dto.conversion_client_id ?? null,
      conversion_vehicle_id: dto.conversion_vehicle_id ?? null,
      status: dto.status || 'scheduled',
    });

    const saved = await this.appointmentRepository.save(appointment);
    const created = await this.findOne(saved.id);

    if (created.status === 'scheduled') {
      this.notifications.notifyClient(created, 'scheduled');
    }

    return created;
  }

  async update(id: number, dto: UpdateAppointmentDto): Promise<Appointment> {
    const appointment = await this.findOne(id);
    const previousStart = appointment.appointment_date ? new Date(appointment.appointment_date).getTime() : null;
    const { appointment_date, end_date, ...fields } = dto;
    Object.assign(appointment, fields);
    if (appointment_date) {
      appointment.appointment_date = new Date(appointment_date);
    }
    if (end_date !== undefined) {
      appointment.end_date = end_date ? new Date(end_date) : null;
    }
    await this.appointmentRepository.save(appointment);
    const updated = await this.findOne(id);

    const startChanged = new Date(updated.appointment_date).getTime() !== previousStart;
    if (startChanged && updated.status === 'scheduled') {
      this.notifications.notifyClient(updated, 'rescheduled');
    }

    return updated;
  }

  async remove(id: number): Promise<void> {
    const appointment = await this.findOne(id);
    await this.appointmentRepository.remove(appointment);
  }
}
