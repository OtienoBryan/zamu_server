import { LpgLedgerService } from './lpg-ledger.service';
import { StationLpgLedger } from '../entities/station-lpg-ledger.entity';
export declare class LpgLedgerController {
    private readonly lpgLedgerService;
    constructor(lpgLedgerService: LpgLedgerService);
    findAll(stationId: number): Promise<StationLpgLedger[]>;
}
