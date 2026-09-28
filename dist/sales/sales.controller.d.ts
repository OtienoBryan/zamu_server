import { SalesService, WeeklySalesReport, VehicleFuelReport } from './sales.service';
import { Sale } from '../entities/sale.entity';
import { CreateSaleDto } from './dto/create-sale.dto';
export declare class SalesController {
    private readonly salesService;
    constructor(salesService: SalesService);
    create(createDto: CreateSaleDto): Promise<Sale>;
    findAll(stationId?: string, keyAccountId?: string, conversionClientId?: string): Promise<Sale[]>;
    getWeeklyReport(startDate?: string, endDate?: string, stationId?: string): Promise<WeeklySalesReport>;
    getFuelReport(startDate?: string, endDate?: string, stationId?: string): Promise<VehicleFuelReport>;
    findOne(id: number): Promise<Sale>;
}
