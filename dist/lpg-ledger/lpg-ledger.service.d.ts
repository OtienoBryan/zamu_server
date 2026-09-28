import { Repository } from 'typeorm';
import { StationLpgLedger } from '../entities/station-lpg-ledger.entity';
export declare class LpgLedgerService {
    private ledgerRepository;
    constructor(ledgerRepository: Repository<StationLpgLedger>);
    findAllForStation(stationId: number): Promise<StationLpgLedger[]>;
}
