import { Repository, DataSource } from 'typeorm';
import { MachineServiceRecord } from '../entities/machine-service-record.entity';
import { Machine } from '../entities/machine.entity';
import { RawMaterialStore } from '../entities/raw-material-store.entity';
import { CreateMachineServiceDto } from './dto/create-machine-service.dto';
export declare class MachineServiceService {
    private serviceRecordRepository;
    private machineRepository;
    private storeRepository;
    private dataSource;
    constructor(serviceRecordRepository: Repository<MachineServiceRecord>, machineRepository: Repository<Machine>, storeRepository: Repository<RawMaterialStore>, dataSource: DataSource);
    findAll(machineId?: number): Promise<MachineServiceRecord[]>;
    findOne(id: number): Promise<MachineServiceRecord>;
    create(dto: CreateMachineServiceDto, createdBy: number): Promise<MachineServiceRecord>;
}
