import { OmcsService } from './omcs.service';
import { Omc } from '../entities/omc.entity';
export declare class OmcsController {
    private readonly service;
    constructor(service: OmcsService);
    findAll(): Promise<Omc[]>;
    findOne(id: number): Promise<Omc>;
    create(body: Partial<Omc>): Promise<Omc>;
    update(id: number, body: Partial<Omc>): Promise<Omc>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
