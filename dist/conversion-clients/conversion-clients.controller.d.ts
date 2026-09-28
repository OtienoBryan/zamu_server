import { ConversionClientsService } from './conversion-clients.service';
import { ConversionClient } from '../entities/conversion-client.entity';
import { CreateConversionClientDto } from './dto/create-conversion-client.dto';
import { UpdateConversionClientDto } from './dto/update-conversion-client.dto';
export declare class ConversionClientsController {
    private readonly conversionClientsService;
    constructor(conversionClientsService: ConversionClientsService);
    findAll(): Promise<ConversionClient[]>;
    findOne(id: number): Promise<ConversionClient>;
    create(createConversionClientDto: CreateConversionClientDto): Promise<ConversionClient>;
    update(id: number, updateConversionClientDto: UpdateConversionClientDto): Promise<ConversionClient>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
