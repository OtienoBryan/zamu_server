import { Repository } from 'typeorm';
import { ConversionClient } from '../entities/conversion-client.entity';
import { CreateConversionClientDto } from './dto/create-conversion-client.dto';
import { UpdateConversionClientDto } from './dto/update-conversion-client.dto';
export declare class ConversionClientsService {
    private conversionClientRepository;
    constructor(conversionClientRepository: Repository<ConversionClient>);
    findAll(): Promise<ConversionClient[]>;
    findOne(id: number): Promise<ConversionClient>;
    create(createConversionClientDto: CreateConversionClientDto): Promise<ConversionClient>;
    private generateUniqueAccountNumber;
    update(id: number, updateConversionClientDto: UpdateConversionClientDto): Promise<ConversionClient>;
    remove(id: number): Promise<void>;
}
