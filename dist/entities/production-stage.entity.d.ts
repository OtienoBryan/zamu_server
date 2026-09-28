export declare class ProductionStage {
    id: number;
    name: string;
    description: string | null;
    sequenceOrder: number;
    status: 'active' | 'inactive';
    createdAt: Date;
    updatedAt: Date;
}
