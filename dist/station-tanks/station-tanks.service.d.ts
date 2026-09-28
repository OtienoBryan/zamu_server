import { Repository } from 'typeorm';
import { StationTank } from '../entities/station-tank.entity';
import { Station } from '../entities/station.entity';
import { CreateStationTankDto } from './dto/create-station-tank.dto';
import { UpdateStationTankDto } from './dto/update-station-tank.dto';
export declare class StationTanksService {
    private tankRepository;
    private stationRepository;
    constructor(tankRepository: Repository<StationTank>, stationRepository: Repository<Station>);
    findAll(stationId?: number): Promise<StationTank[]>;
    findOne(id: number): Promise<StationTank>;
    create(dto: CreateStationTankDto): Promise<StationTank>;
    update(id: number, dto: UpdateStationTankDto): Promise<StationTank>;
    remove(id: number): Promise<void>;
    private syncStationQuantity;
}
