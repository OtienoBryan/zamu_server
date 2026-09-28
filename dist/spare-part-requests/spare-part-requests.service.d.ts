import { Repository, DataSource } from 'typeorm';
import { SparePartRequest } from '../entities/spare-part-request.entity';
import { SparePartRequestItem } from '../entities/spare-part-request-item.entity';
import { RawMaterialStore } from '../entities/raw-material-store.entity';
import { SparePart } from '../entities/spare-part.entity';
import { Machine } from '../entities/machine.entity';
import { StaffMember } from '../entities/staff-member.entity';
import { CreateSparePartRequestDto } from './dto/create-spare-part-request.dto';
import { FulfillSparePartRequestDto } from './dto/fulfill-spare-part-request.dto';
export declare class SparePartRequestsService {
    private requestRepository;
    private itemRepository;
    private storeRepository;
    private sparePartRepository;
    private machineRepository;
    private staffMemberRepository;
    private dataSource;
    constructor(requestRepository: Repository<SparePartRequest>, itemRepository: Repository<SparePartRequestItem>, storeRepository: Repository<RawMaterialStore>, sparePartRepository: Repository<SparePart>, machineRepository: Repository<Machine>, staffMemberRepository: Repository<StaffMember>, dataSource: DataSource);
    findAll(): Promise<SparePartRequest[]>;
    findOne(id: number): Promise<SparePartRequest>;
    create(dto: CreateSparePartRequestDto, requestedBy: number): Promise<SparePartRequest>;
    fulfill(id: number, dto: FulfillSparePartRequestDto, fulfilledBy: number): Promise<SparePartRequest>;
    cancel(id: number): Promise<SparePartRequest>;
}
