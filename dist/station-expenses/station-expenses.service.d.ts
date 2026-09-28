import { Repository } from 'typeorm';
import { StationExpense } from '../entities/station-expense.entity';
import { CreateStationExpenseDto } from './dto/create-station-expense.dto';
import { UpdateStationExpenseDto } from './dto/update-station-expense.dto';
export declare class StationExpensesService {
    private expenseRepository;
    constructor(expenseRepository: Repository<StationExpense>);
    findAll(stationId?: number): Promise<StationExpense[]>;
    findOne(id: number): Promise<StationExpense>;
    create(dto: CreateStationExpenseDto, userId?: number | null): Promise<StationExpense>;
    update(id: number, dto: UpdateStationExpenseDto): Promise<StationExpense>;
    remove(id: number): Promise<void>;
}
