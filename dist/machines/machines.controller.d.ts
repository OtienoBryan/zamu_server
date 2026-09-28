import { MachinesService } from './machines.service';
import { Machine } from '../entities/machine.entity';
import { MachineCategory } from '../entities/machine-category.entity';
import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateMachineDto } from './dto/update-machine.dto';
export declare class MachinesController {
    private readonly machinesService;
    constructor(machinesService: MachinesService);
    findAllCategories(): Promise<MachineCategory[]>;
    createCategory(name: string): Promise<MachineCategory>;
    updateCategory(id: number, name: string): Promise<MachineCategory>;
    removeCategory(id: number): Promise<{
        message: string;
    }>;
    findAll(): Promise<Machine[]>;
    findOne(id: number): Promise<Machine>;
    create(dto: CreateMachineDto): Promise<Machine>;
    update(id: number, dto: UpdateMachineDto): Promise<Machine>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
