import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientRecord } from '../entities/client-record.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('clients')
@UseGuards(JwtAuthGuard)
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  async findAll(): Promise<ClientRecord[]> {
    return this.clientsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ClientRecord> {
    return this.clientsService.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreateClientDto): Promise<ClientRecord> {
    return this.clientsService.create(dto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateClientDto,
  ): Promise<ClientRecord> {
    return this.clientsService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.clientsService.remove(id);
    return { message: 'Client deleted successfully' };
  }
}
