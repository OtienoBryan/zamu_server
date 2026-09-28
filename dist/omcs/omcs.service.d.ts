import { Repository } from 'typeorm';
import { Omc } from '../entities/omc.entity';
export declare class OmcsService {
    private repo;
    constructor(repo: Repository<Omc>);
    findAll(): Promise<Omc[]>;
    findOne(id: number): Promise<Omc>;
    create(data: Partial<Omc>): Promise<Omc>;
    update(id: number, data: Partial<Omc>): Promise<Omc>;
    remove(id: number): Promise<void>;
}
