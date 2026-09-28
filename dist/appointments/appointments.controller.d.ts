import { AppointmentsService } from './appointments.service';
import { Appointment } from '../entities/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
export declare class AppointmentsController {
    private readonly appointmentsService;
    constructor(appointmentsService: AppointmentsService);
    findAll(): Promise<Appointment[]>;
    findOne(id: number): Promise<Appointment>;
    create(createAppointmentDto: CreateAppointmentDto): Promise<Appointment>;
    update(id: number, updateAppointmentDto: UpdateAppointmentDto): Promise<Appointment>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
