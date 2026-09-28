export declare class CreateSparePartRequestItemDto {
    sparePartId: number;
    quantity: number;
}
export declare class CreateSparePartRequestDto {
    storeId: number;
    machineId?: number;
    staffMemberId?: number;
    items: CreateSparePartRequestItemDto[];
    notes?: string;
}
