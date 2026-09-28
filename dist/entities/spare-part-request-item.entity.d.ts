import { SparePartRequest } from './spare-part-request.entity';
import { SparePart } from './spare-part.entity';
export declare class SparePartRequestItem {
    id: number;
    requestId: number;
    request: SparePartRequest;
    sparePartId: number;
    sparePart: SparePart;
    quantity: number;
}
