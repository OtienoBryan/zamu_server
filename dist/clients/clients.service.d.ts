import { Repository } from 'typeorm';
import { ClientRecord } from '../entities/client-record.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
export declare class ClientsService {
    private clientRepository;
    constructor(clientRepository: Repository<ClientRecord>);
    findAll(): Promise<ClientRecord[]>;
    findOne(id: number): Promise<ClientRecord>;
    create(dto: CreateClientDto): Promise<ClientRecord>;
    update(id: number, dto: UpdateClientDto): Promise<ClientRecord>;
    remove(id: number): Promise<void>;
}
