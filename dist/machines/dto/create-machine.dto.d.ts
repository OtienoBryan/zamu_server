export declare class CreateMachineDto {
    name: string;
    machineCode?: string;
    serialNumber?: string;
    categoryId?: number | null;
    storeId?: number | null;
    maintenanceIntervalDays?: number | null;
    description?: string;
    status?: 'active' | 'inactive' | 'in_repair';
}
