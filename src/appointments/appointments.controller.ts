import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { Appointment } from '../entities/appointment.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Controller('appointments')
@UseGuards(JwtAuthGuard)
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Get()
  async findAll(): Promise<Appointment[]> {
    return this.appointmentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Appointment> {
    return this.appointmentsService.findOne(id);
  }

  @Post()
  async create(@Body() createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateAppointmentDto: UpdateAppointmentDto): Promise<Appointment> {
    return this.appointmentsService.update(id, updateAppointmentDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.appointmentsService.remove(id);
    return { message: 'Appointment deleted successfully' };
  }
}
