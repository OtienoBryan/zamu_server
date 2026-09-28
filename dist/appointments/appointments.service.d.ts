import { Repository } from 'typeorm';
import { Appointment } from '../entities/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { AppointmentNotificationsService } from '../notifications/appointment-notifications.service';
export declare class AppointmentsService {
    private appointmentRepository;
    private notifications;
    constructor(appointmentRepository: Repository<Appointment>, notifications: AppointmentNotificationsService);
    findAll(): Promise<Appointment[]>;
    findOne(id: number): Promise<Appointment>;
    create(dto: CreateAppointmentDto): Promise<Appointment>;
    update(id: number, dto: UpdateAppointmentDto): Promise<Appointment>;
    remove(id: number): Promise<void>;
}
