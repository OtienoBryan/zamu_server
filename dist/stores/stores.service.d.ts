import { Repository } from 'typeorm';
import { Store } from '../entities/store.entity';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
export declare class StoresService {
    private storeRepository;
    constructor(storeRepository: Repository<Store>);
    findAll(): Promise<Store[]>;
    findOne(id: number): Promise<Store>;
    create(createStoreDto: CreateStoreDto): Promise<Store>;
    private generateUniqueStoreCode;
    update(id: number, updateStoreDto: UpdateStoreDto): Promise<Store>;
    remove(id: number): Promise<void>;
}
