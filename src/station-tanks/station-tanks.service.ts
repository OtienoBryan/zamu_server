import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StationTank } from '../entities/station-tank.entity';
import { Station } from '../entities/station.entity';
import { CreateStationTankDto } from './dto/create-station-tank.dto';
import { UpdateStationTankDto } from './dto/update-station-tank.dto';

@Injectable()
export class StationTanksService {
  constructor(
    @InjectRepository(StationTank)
    private tankRepository: Repository<StationTank>,
    @InjectRepository(Station)
    private stationRepository: Repository<Station>,
  ) {}

  async findAll(stationId?: number): Promise<StationTank[]> {
    return this.tankRepository.find({
      where: stationId ? { station_id: stationId } : {},
      order: { station_id: 'ASC', name: 'ASC' },
    });
  }

  async findOne(id: number): Promise<StationTank> {
    const tank = await this.tankRepository.findOne({ where: { id } });
    if (!tank) {
      throw new NotFoundException(`Tank with ID ${id} not found`);
    }
    return tank;
  }

  async create(dto: CreateStationTankDto): Promise<StationTank> {
    const station = await this.stationRepository.findOne({ where: { id: dto.station_id } });
    if (!station) {
      throw new NotFoundException(`Station with ID ${dto.station_id} not found`);
    }

    const tank = this.tankRepository.create({
      station_id: dto.station_id,
      name: dto.name,
      capacity: dto.capacity ?? 0,
      current_quantity: dto.current_quantity ?? 0,
      status: dto.status || 'active',
    });
    const saved = await this.tankRepository.save(tank);

    await this.syncStationQuantity(dto.station_id);
    return this.findOne(saved.id);
  }

  async update(id: number, dto: UpdateStationTankDto): Promise<StationTank> {
    const tank = await this.findOne(id);
    Object.assign(tank, dto);
    await this.tankRepository.save(tank);

    await this.syncStationQuantity(tank.station_id);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const tank = await this.findOne(id);
    const stationId = tank.station_id;
    await this.tankRepository.remove(tank);
    await this.syncStationQuantity(stationId);
  }

  /**
   * Tanks are the source of truth for stock, so Stations.lpgQuantity is kept as a
   * mirror of their sum — anything still reading that column stays correct.
   */
  private async syncStationQuantity(stationId: number): Promise<void> {
    const tanks = await this.tankRepository.find({ where: { station_id: stationId } });
    const total = tanks.reduce((sum, t) => sum + Number(t.current_quantity || 0), 0);

    const station = await this.stationRepository.findOne({ where: { id: stationId } });
    if (station) {
      station.lpgQuantity = total;
      await this.stationRepository.save(station);
      console.log(`⛽ [StationTanksService] Station ${stationId} lpgQuantity synced to ${total}`);
    }
  }
}
