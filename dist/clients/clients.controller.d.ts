import { ClientsService } from './clients.service';
import { ClientRecord } from '../entities/client-record.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
export declare class ClientsController {
    private readonly clientsService;
    constructor(clientsService: ClientsService);
    findAll(): Promise<ClientRecord[]>;
    findOne(id: number): Promise<ClientRecord>;
    create(dto: CreateClientDto): Promise<ClientRecord>;
    update(id: number, dto: UpdateClientDto): Promise<ClientRecord>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
