export declare class CreateWorkOrderWasteDto {
    workOrderId: number;
    rawMaterialId: number;
    storeId: number;
    type: 'offcut' | 'damage';
    reusable?: boolean;
    quantity: number;
    notes?: string;
}
