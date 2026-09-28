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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const appointment_entity_1 = require("../entities/appointment.entity");
const appointment_notifications_service_1 = require("../notifications/appointment-notifications.service");
const RELATIONS = ['conversionClient', 'conversionVehicle'];
let AppointmentsService = class AppointmentsService {
    appointmentRepository;
    notifications;
    constructor(appointmentRepository, notifications) {
        this.appointmentRepository = appointmentRepository;
        this.notifications = notifications;
    }
    async findAll() {
        return this.appointmentRepository.find({
            relations: RELATIONS,
            order: { appointment_date: 'ASC' },
        });
    }
    async findOne(id) {
        const appointment = await this.appointmentRepository.findOne({
            where: { id },
            relations: RELATIONS,
        });
        if (!appointment) {
            throw new common_1.NotFoundException(`Appointment with ID ${id} not found`);
        }
        return appointment;
    }
    async create(dto) {
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
    async update(id, dto) {
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
    async remove(id) {
        const appointment = await this.findOne(id);
        await this.appointmentRepository.remove(appointment);
    }
};
exports.AppointmentsService = AppointmentsService;
exports.AppointmentsService = AppointmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(appointment_entity_1.Appointment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        appointment_notifications_service_1.AppointmentNotificationsService])
], AppointmentsService);
//# sourceMappingURL=appointments.service.js.map