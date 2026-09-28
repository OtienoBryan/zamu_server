import { FinishedProduct } from './finished-product.entity';
import { ProductionStage } from './production-stage.entity';
import { StaffMember } from './staff-member.entity';
import { WorkOrderStaff } from './work-order-staff.entity';
import { WorkOrderMaterial } from './work-order-material.entity';
export type WorkOrderStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';
export declare class WorkOrder {
    id: number;
    description: string;
    productId: number;
    product: FinishedProduct;
    stageId: number;
    stage: ProductionStage;
    staffId: number;
    staff: StaffMember;
    date: string;
    targetQuantity: number;
    status: WorkOrderStatus;
    createdAt: Date;
    updatedAt: Date;
    assignedStaff: WorkOrderStaff[];
    materials: WorkOrderMaterial[];
}
