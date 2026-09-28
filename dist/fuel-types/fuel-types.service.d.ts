import { Repository } from 'typeorm';
import { FuelType } from '../entities/fuel-type.entity';
export declare class FuelTypesService {
    private repo;
    constructor(repo: Repository<FuelType>);
    findAll(): Promise<FuelType[]>;
    findOne(id: number): Promise<FuelType>;
    create(data: Partial<FuelType>): Promise<FuelType>;
    update(id: number, data: Partial<FuelType>): Promise<FuelType>;
    remove(id: number): Promise<void>;
}
