import { StoresService } from './stores.service';
import { Store } from '../entities/store.entity';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
export declare class StoresController {
    private readonly storesService;
    constructor(storesService: StoresService);
    findAll(): Promise<Store[]>;
    findOne(id: number): Promise<Store>;
    create(createStoreDto: CreateStoreDto): Promise<Store>;
    update(id: number, updateStoreDto: UpdateStoreDto): Promise<Store>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
