import { StationExpensesService } from './station-expenses.service';
import { StationExpense } from '../entities/station-expense.entity';
import { CreateStationExpenseDto } from './dto/create-station-expense.dto';
import { UpdateStationExpenseDto } from './dto/update-station-expense.dto';
export declare class StationExpensesController {
    private readonly stationExpensesService;
    constructor(stationExpensesService: StationExpensesService);
    findAll(stationId?: string): Promise<StationExpense[]>;
    findOne(id: number): Promise<StationExpense>;
    create(dto: CreateStationExpenseDto, req: any): Promise<StationExpense>;
    update(id: number, dto: UpdateStationExpenseDto): Promise<StationExpense>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
