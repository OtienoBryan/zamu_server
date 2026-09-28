import { Repository } from 'typeorm';
import { Sale } from '../entities/sale.entity';
import { Station } from '../entities/station.entity';
import { Vehicle } from '../entities/vehicle.entity';
import { ConversionVehicle } from '../entities/conversion-vehicle.entity';
import { CreateSaleDto } from './dto/create-sale.dto';
export interface WeeklyReportVehicle {
    key: string;
    vehicleId: number | null;
    conversionVehicleId: number | null;
    regNo: string;
    org: string;
    driver: string;
    tel: string;
    daily: Record<string, number>;
    totalQuantity: number;
    totalAmount: number;
}
export interface WeeklySalesReport {
    startDate: string;
    endDate: string;
    vehicles: WeeklyReportVehicle[];
}
export interface FuelReportVehicle {
    key: string;
    vehicleId: number | null;
    conversionVehicleId: number | null;
    regNo: string;
    org: string;
    driver: string;
    tel: string;
    dailyFills: Record<string, number>;
    totalFills: number;
    totalQuantity: number;
    totalAmount: number;
}
export interface VehicleFuelReport {
    startDate: string;
    endDate: string;
    vehicles: FuelReportVehicle[];
}
export declare class SalesService {
    private saleRepository;
    private stationRepository;
    private vehicleRepository;
    private conversionVehicleRepository;
    constructor(saleRepository: Repository<Sale>, stationRepository: Repository<Station>, vehicleRepository: Repository<Vehicle>, conversionVehicleRepository: Repository<ConversionVehicle>);
    create(createDto: CreateSaleDto): Promise<Sale>;
    findAll(stationId?: number, keyAccountId?: number, conversionClientId?: number): Promise<Sale[]>;
    getWeeklyReport(startDate: string, endDate: string, stationId?: number): Promise<WeeklySalesReport>;
    getFuelReport(startDate: string, endDate: string, stationId?: number): Promise<VehicleFuelReport>;
    findOne(id: number): Promise<Sale>;
}
