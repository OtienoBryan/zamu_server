import { StationTanksService } from './station-tanks.service';
import { StationTank } from '../entities/station-tank.entity';
import { CreateStationTankDto } from './dto/create-station-tank.dto';
import { UpdateStationTankDto } from './dto/update-station-tank.dto';
export declare class StationTanksController {
    private readonly stationTanksService;
    constructor(stationTanksService: StationTanksService);
    findAll(stationId?: string): Promise<StationTank[]>;
    findOne(id: number): Promise<StationTank>;
    create(dto: CreateStationTankDto): Promise<StationTank>;
    update(id: number, dto: UpdateStationTankDto): Promise<StationTank>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
