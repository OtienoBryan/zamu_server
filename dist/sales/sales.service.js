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
exports.SalesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const sale_entity_1 = require("../entities/sale.entity");
const station_entity_1 = require("../entities/station.entity");
const vehicle_entity_1 = require("../entities/vehicle.entity");
const conversion_vehicle_entity_1 = require("../entities/conversion-vehicle.entity");
let SalesService = class SalesService {
    saleRepository;
    stationRepository;
    vehicleRepository;
    conversionVehicleRepository;
    constructor(saleRepository, stationRepository, vehicleRepository, conversionVehicleRepository) {
        this.saleRepository = saleRepository;
        this.stationRepository = stationRepository;
        this.vehicleRepository = vehicleRepository;
        this.conversionVehicleRepository = conversionVehicleRepository;
    }
    async create(createDto) {
        console.log('💰 [SalesService] Creating sale');
        const station = await this.stationRepository.findOne({
            where: { id: createDto.stationId }
        });
        if (!station) {
            throw new common_1.NotFoundException(`Station with ID ${createDto.stationId} not found`);
        }
        const saleData = {
            stationId: createDto.stationId,
            clientType: createDto.clientType,
            quantity: createDto.quantity,
            unitPrice: createDto.unitPrice,
            totalAmount: createDto.totalAmount,
            saleDate: new Date(createDto.saleDate),
        };
        if (createDto.keyAccountId) {
            saleData.keyAccountId = createDto.keyAccountId;
        }
        if (createDto.vehicleId) {
            saleData.vehicleId = createDto.vehicleId;
        }
        if (createDto.referenceNumber) {
            saleData.referenceNumber = createDto.referenceNumber;
        }
        if (createDto.notes) {
            saleData.notes = createDto.notes;
        }
        if (createDto.imagePath) {
            saleData.imagePath = createDto.imagePath;
        }
        if (createDto.createdBy) {
            saleData.createdBy = createDto.createdBy;
        }
        const sale = this.saleRepository.create(saleData);
        const savedSale = await this.saleRepository.save(sale);
        console.log(`✅ [SalesService] Sale created with ID: ${savedSale.id}`);
        const saleWithRelations = await this.saleRepository.findOne({
            where: { id: savedSale.id },
            relations: ['station', 'keyAccount', 'vehicle', 'conversionClient', 'conversionVehicle']
        });
        return saleWithRelations || savedSale;
    }
    async findAll(stationId, keyAccountId, conversionClientId) {
        console.log('💰 [SalesService] Finding all sales');
        const where = {};
        if (stationId) {
            where.stationId = stationId;
        }
        if (keyAccountId) {
            where.keyAccountId = keyAccountId;
        }
        if (conversionClientId) {
            where.conversionClientId = conversionClientId;
        }
        const sales = await this.saleRepository.find({
            where,
            relations: ['station', 'keyAccount', 'vehicle', 'conversionClient', 'conversionVehicle'],
            order: { saleDate: 'DESC' },
        });
        console.log(`✅ [SalesService] Found ${sales.length} sales`);
        return sales;
    }
    async getWeeklyReport(startDate, endDate, stationId) {
        console.log(`💰 [SalesService] Weekly report ${startDate} → ${endDate}${stationId ? ` (station ${stationId})` : ''}`);
        const start = new Date(`${startDate}T00:00:00`);
        const endExclusive = new Date(`${endDate}T00:00:00`);
        endExclusive.setDate(endExclusive.getDate() + 1);
        const qb = this.saleRepository
            .createQueryBuilder('sale')
            .leftJoin('sale.vehicle', 'vehicle')
            .leftJoin('vehicle.keyAccount', 'keyAccount')
            .leftJoin('sale.conversionVehicle', 'conversionVehicle')
            .leftJoin('sale.conversionClient', 'conversionClient')
            .select('sale.vehicle_id', 'vehicleId')
            .addSelect('sale.conversion_vehicle_id', 'conversionVehicleId')
            .addSelect('COALESCE(vehicle.registration_number, conversionVehicle.registration_number)', 'regNo')
            .addSelect('keyAccount.name', 'org')
            .addSelect('COALESCE(vehicle.driver_name, conversionClient.name)', 'driver')
            .addSelect('COALESCE(vehicle.driver_contact, conversionClient.contact)', 'tel')
            .addSelect('DATE(sale.sale_date)', 'day')
            .addSelect('SUM(sale.quantity)', 'quantity')
            .addSelect('SUM(sale.total_amount)', 'amount')
            .where('sale.sale_date >= :start', { start })
            .andWhere('sale.sale_date < :end', { end: endExclusive })
            .groupBy('sale.vehicle_id')
            .addGroupBy('sale.conversion_vehicle_id')
            .addGroupBy('vehicle.registration_number')
            .addGroupBy('conversionVehicle.registration_number')
            .addGroupBy('keyAccount.name')
            .addGroupBy('vehicle.driver_name')
            .addGroupBy('vehicle.driver_contact')
            .addGroupBy('conversionClient.name')
            .addGroupBy('conversionClient.contact')
            .addGroupBy('DATE(sale.sale_date)');
        if (stationId) {
            qb.andWhere('sale.station_id = :stationId', { stationId });
        }
        const rows = await qb.getRawMany();
        const toDayString = (value) => {
            if (value instanceof Date) {
                const y = value.getFullYear();
                const m = String(value.getMonth() + 1).padStart(2, '0');
                const d = String(value.getDate()).padStart(2, '0');
                return `${y}-${m}-${d}`;
            }
            return String(value).slice(0, 10);
        };
        const vehicleMap = new Map();
        for (const row of rows) {
            const vehicleId = row.vehicleId ? Number(row.vehicleId) : null;
            const conversionVehicleId = row.conversionVehicleId ? Number(row.conversionVehicleId) : null;
            const key = vehicleId ? `v-${vehicleId}` : conversionVehicleId ? `cv-${conversionVehicleId}` : 'unassigned';
            let entry = vehicleMap.get(key);
            if (!entry) {
                const anyId = vehicleId ?? conversionVehicleId;
                entry = {
                    key,
                    vehicleId,
                    conversionVehicleId,
                    regNo: row.regNo || (anyId ? `Vehicle #${anyId}` : 'No Vehicle'),
                    org: row.org || '',
                    driver: row.driver || '',
                    tel: row.tel || '',
                    daily: {},
                    totalQuantity: 0,
                    totalAmount: 0,
                };
                vehicleMap.set(key, entry);
            }
            const day = toDayString(row.day);
            const quantity = Number(row.quantity) || 0;
            entry.daily[day] = (entry.daily[day] || 0) + quantity;
            entry.totalQuantity += quantity;
            entry.totalAmount += Number(row.amount) || 0;
        }
        const vehicles = Array.from(vehicleMap.values()).sort((a, b) => {
            const aUnassigned = a.vehicleId === null && a.conversionVehicleId === null;
            const bUnassigned = b.vehicleId === null && b.conversionVehicleId === null;
            if (aUnassigned)
                return 1;
            if (bUnassigned)
                return -1;
            return a.regNo.localeCompare(b.regNo);
        });
        console.log(`✅ [SalesService] Weekly report built for ${vehicles.length} vehicles`);
        return { startDate, endDate, vehicles };
    }
    async getFuelReport(startDate, endDate, stationId) {
        console.log(`⛽ [SalesService] Fuel report ${startDate} → ${endDate}${stationId ? ` (station ${stationId})` : ''}`);
        const start = new Date(`${startDate}T00:00:00`);
        const endExclusive = new Date(`${endDate}T00:00:00`);
        endExclusive.setDate(endExclusive.getDate() + 1);
        const qb = this.saleRepository
            .createQueryBuilder('sale')
            .select('sale.vehicle_id', 'vehicleId')
            .addSelect('sale.conversion_vehicle_id', 'conversionVehicleId')
            .addSelect('DATE(sale.sale_date)', 'day')
            .addSelect('COUNT(*)', 'fills')
            .addSelect('SUM(sale.quantity)', 'quantity')
            .addSelect('SUM(sale.total_amount)', 'amount')
            .where('sale.sale_date >= :start', { start })
            .andWhere('sale.sale_date < :end', { end: endExclusive })
            .groupBy('sale.vehicle_id')
            .addGroupBy('sale.conversion_vehicle_id')
            .addGroupBy('DATE(sale.sale_date)');
        if (stationId) {
            qb.andWhere('sale.station_id = :stationId', { stationId });
        }
        const [rows, kaVehicles, convVehicles] = await Promise.all([
            qb.getRawMany(),
            this.vehicleRepository.find({ relations: ['keyAccount'] }),
            this.conversionVehicleRepository.find({ relations: ['conversionClient'] }),
        ]);
        const toDayString = (value) => {
            if (value instanceof Date) {
                const y = value.getFullYear();
                const m = String(value.getMonth() + 1).padStart(2, '0');
                const d = String(value.getDate()).padStart(2, '0');
                return `${y}-${m}-${d}`;
            }
            return String(value).slice(0, 10);
        };
        const vehicleMap = new Map();
        for (const v of kaVehicles) {
            vehicleMap.set(`v-${v.id}`, {
                key: `v-${v.id}`,
                vehicleId: v.id,
                conversionVehicleId: null,
                regNo: v.registration_number,
                org: v.keyAccount?.name || '',
                driver: v.driver_name || '',
                tel: v.driver_contact || '',
                dailyFills: {},
                totalFills: 0,
                totalQuantity: 0,
                totalAmount: 0,
            });
        }
        for (const v of convVehicles) {
            vehicleMap.set(`cv-${v.id}`, {
                key: `cv-${v.id}`,
                vehicleId: null,
                conversionVehicleId: v.id,
                regNo: v.registration_number,
                org: v.conversionClient?.organization_name || '',
                driver: v.conversionClient?.name || '',
                tel: v.conversionClient?.contact || '',
                dailyFills: {},
                totalFills: 0,
                totalQuantity: 0,
                totalAmount: 0,
            });
        }
        for (const row of rows) {
            const vehicleId = row.vehicleId ? Number(row.vehicleId) : null;
            const conversionVehicleId = row.conversionVehicleId ? Number(row.conversionVehicleId) : null;
            const key = vehicleId ? `v-${vehicleId}` : conversionVehicleId ? `cv-${conversionVehicleId}` : 'unassigned';
            let entry = vehicleMap.get(key);
            if (!entry) {
                const anyId = vehicleId ?? conversionVehicleId;
                entry = {
                    key,
                    vehicleId,
                    conversionVehicleId,
                    regNo: anyId ? `Vehicle #${anyId}` : 'No Vehicle',
                    org: '',
                    driver: '',
                    tel: '',
                    dailyFills: {},
                    totalFills: 0,
                    totalQuantity: 0,
                    totalAmount: 0,
                };
                vehicleMap.set(key, entry);
            }
            const day = toDayString(row.day);
            const fills = Number(row.fills) || 0;
            entry.dailyFills[day] = (entry.dailyFills[day] || 0) + fills;
            entry.totalFills += fills;
            entry.totalQuantity += Number(row.quantity) || 0;
            entry.totalAmount += Number(row.amount) || 0;
        }
        const vehicles = Array.from(vehicleMap.values()).sort((a, b) => {
            const aUnassigned = a.vehicleId === null && a.conversionVehicleId === null;
            const bUnassigned = b.vehicleId === null && b.conversionVehicleId === null;
            if (aUnassigned)
                return 1;
            if (bUnassigned)
                return -1;
            return a.regNo.localeCompare(b.regNo);
        });
        console.log(`✅ [SalesService] Fuel report built for ${vehicles.length} vehicles`);
        return { startDate, endDate, vehicles };
    }
    async findOne(id) {
        console.log(`💰 [SalesService] Finding sale by ID: ${id}`);
        const sale = await this.saleRepository.findOne({
            where: { id },
            relations: ['station', 'keyAccount', 'vehicle', 'conversionClient', 'conversionVehicle']
        });
        if (!sale) {
            console.log(`❌ [SalesService] Sale with ID ${id} not found`);
            throw new common_1.NotFoundException(`Sale with ID ${id} not found`);
        }
        console.log(`✅ [SalesService] Sale found`);
        return sale;
    }
};
exports.SalesService = SalesService;
exports.SalesService = SalesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(sale_entity_1.Sale)),
    __param(1, (0, typeorm_1.InjectRepository)(station_entity_1.Station)),
    __param(2, (0, typeorm_1.InjectRepository)(vehicle_entity_1.Vehicle)),
    __param(3, (0, typeorm_1.InjectRepository)(conversion_vehicle_entity_1.ConversionVehicle)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], SalesService);
//# sourceMappingURL=sales.service.js.map