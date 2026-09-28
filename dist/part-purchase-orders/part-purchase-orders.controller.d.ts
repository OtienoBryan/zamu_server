import { PartPurchaseOrdersService } from './part-purchase-orders.service';
export declare class PartPurchaseOrdersController {
    private readonly service;
    constructor(service: PartPurchaseOrdersService);
    findAll(): Promise<import("../entities/part-purchase-order.entity").PartPurchaseOrder[]>;
    nextPO(): Promise<{
        po_number: string;
    }>;
    findOne(id: number): Promise<import("../entities/part-purchase-order.entity").PartPurchaseOrder>;
    create(body: any): Promise<import("../entities/part-purchase-order.entity").PartPurchaseOrder>;
    updateStatus(id: number, b: any): Promise<import("../entities/part-purchase-order.entity").PartPurchaseOrder>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
