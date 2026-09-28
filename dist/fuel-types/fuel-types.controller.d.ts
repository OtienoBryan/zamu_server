import { FuelTypesService } from './fuel-types.service';
import { FuelType } from '../entities/fuel-type.entity';
export declare class FuelTypesController {
    private readonly service;
    constructor(service: FuelTypesService);
    findAll(): Promise<FuelType[]>;
    findOne(id: number): Promise<FuelType>;
    create(body: Partial<FuelType>): Promise<FuelType>;
    update(id: number, body: Partial<FuelType>): Promise<FuelType>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
