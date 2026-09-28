export declare class MachineServicePartDto {
    sparePartId: number;
    quantity: number;
}
export declare class CreateMachineServiceDto {
    machineId: number;
    storeId?: number;
    startAt: string;
    endAt: string;
    description: string;
    parts?: MachineServicePartDto[];
    workerIds?: number[];
}
