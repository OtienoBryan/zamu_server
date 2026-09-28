import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientRecord } from '../entities/client-record.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(ClientRecord)
    private clientRepository: Repository<ClientRecord>,
  ) {}

  async findAll(): Promise<ClientRecord[]> {
    return this.clientRepository.find({ order: { name: 'ASC' } });
  }

  async findOne(id: number): Promise<ClientRecord> {
    const client = await this.clientRepository.findOne({ where: { id } });
    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }
    return client;
  }

  async create(dto: CreateClientDto): Promise<ClientRecord> {
    const client = this.clientRepository.create({
      name: dto.name,
      contact: dto.contact ?? null,
      address: dto.address ?? null,
      creditTermsDays: dto.creditTermsDays ?? null,
    });
    return this.clientRepository.save(client);
  }

  async update(id: number, dto: UpdateClientDto): Promise<ClientRecord> {
    const client = await this.findOne(id);
    Object.assign(client, dto);
    return this.clientRepository.save(client);
  }

  async remove(id: number): Promise<void> {
    const client = await this.findOne(id);
    await this.clientRepository.remove(client);
  }
}
