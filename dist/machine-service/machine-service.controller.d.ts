import { MachineServiceService } from './machine-service.service';
import { MachineServiceRecord } from '../entities/machine-service-record.entity';
import { CreateMachineServiceDto } from './dto/create-machine-service.dto';
export declare class MachineServiceController {
    private readonly machineServiceService;
    constructor(machineServiceService: MachineServiceService);
    findAll(machineId?: string): Promise<MachineServiceRecord[]>;
    findOne(id: number): Promise<MachineServiceRecord>;
    create(dto: CreateMachineServiceDto, req: any): Promise<MachineServiceRecord>;
}
