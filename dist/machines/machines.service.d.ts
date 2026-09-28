import { Repository } from 'typeorm';
import { Machine } from '../entities/machine.entity';
import { MachineCategory } from '../entities/machine-category.entity';
import { RawMaterialStore } from '../entities/raw-material-store.entity';
import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateMachineDto } from './dto/update-machine.dto';
export declare class MachinesService {
    private machineRepository;
    private categoryRepository;
    private storeRepository;
    constructor(machineRepository: Repository<Machine>, categoryRepository: Repository<MachineCategory>, storeRepository: Repository<RawMaterialStore>);
    findAll(): Promise<Machine[]>;
    findOne(id: number): Promise<Machine>;
    create(dto: CreateMachineDto): Promise<Machine>;
    update(id: number, dto: UpdateMachineDto): Promise<Machine>;
    remove(id: number): Promise<void>;
    findAllCategories(): Promise<MachineCategory[]>;
    createCategory(name: string): Promise<MachineCategory>;
    updateCategory(id: number, name: string): Promise<MachineCategory>;
    removeCategory(id: number): Promise<void>;
    private ensureCategoryExists;
    private ensureStoreExists;
}
