"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StationTanksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const station_tank_entity_1 = require("../entities/station-tank.entity");
const station_entity_1 = require("../entities/station.entity");
let StationTanksService = class StationTanksService {
    tankRepository;
    stationRepository;
    constructor(tankRepository, stationRepository) {
        this.tankRepository = tankRepository;
        this.stationRepository = stationRepository;
    }
    async findAll(stationId) {
        return this.tankRepository.find({
            where: stationId ? { station_id: stationId } : {},
            order: { station_id: 'ASC', name: 'ASC' },
        });
    }
    async findOne(id) {
        const tank = await this.tankRepository.findOne({ where: { id } });
        if (!tank) {
            throw new common_1.NotFoundException(`Tank with ID ${id} not found`);
        }
        return tank;
    }
    async create(dto) {
        const station = await this.stationRepository.findOne({ where: { id: dto.station_id } });
        if (!station) {
            throw new common_1.NotFoundException(`Station with ID ${dto.station_id} not found`);
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
    async update(id, dto) {
        const tank = await this.findOne(id);
        Object.assign(tank, dto);
        await this.tankRepository.save(tank);
        await this.syncStationQuantity(tank.station_id);
        return this.findOne(id);
    }
    async remove(id) {
        const tank = await this.findOne(id);
        const stationId = tank.station_id;
        await this.tankRepository.remove(tank);
        await this.syncStationQuantity(stationId);
    }
    async syncStationQuantity(stationId) {
        const tanks = await this.tankRepository.find({ where: { station_id: stationId } });
        const total = tanks.reduce((sum, t) => sum + Number(t.current_quantity || 0), 0);
        const station = await this.stationRepository.findOne({ where: { id: stationId } });
        if (station) {
            station.lpgQuantity = total;
            await this.stationRepository.save(station);
            console.log(`⛽ [StationTanksService] Station ${stationId} lpgQuantity synced to ${total}`);
        }
    }
};
exports.StationTanksService = StationTanksService;
exports.StationTanksService = StationTanksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(station_tank_entity_1.StationTank)),
    __param(1, (0, typeorm_1.InjectRepository)(station_entity_1.Station)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], StationTanksService);
//# sourceMappingURL=station-tanks.service.js.map