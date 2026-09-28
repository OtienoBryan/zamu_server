import { Controller, Get, Post, Body, Param, Query, ParseIntPipe, UseGuards, Request, BadRequestException } from '@nestjs/common';
import { MachineServiceService } from './machine-service.service';
import { MachineServiceRecord } from '../entities/machine-service-record.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateMachineServiceDto } from './dto/create-machine-service.dto';

@Controller('machine-service')
@UseGuards(JwtAuthGuard)
export class MachineServiceController {
  constructor(private readonly machineServiceService: MachineServiceService) {}

  @Get()
  async findAll(@Query('machineId') machineId?: string): Promise<MachineServiceRecord[]> {
    if (machineId != null && machineId !== '') {
      const id = Number(machineId);
      if (Number.isNaN(id)) {
        throw new BadRequestException('machineId must be a number');
      }
      return this.machineServiceService.findAll(id);
    }
    return this.machineServiceService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<MachineServiceRecord> {
    return this.machineServiceService.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreateMachineServiceDto, @Request() req): Promise<MachineServiceRecord> {
    return this.machineServiceService.create(dto, req.user.sub);
  }
}
