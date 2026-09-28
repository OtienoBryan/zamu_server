import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkOrderLogsService } from './work-order-logs.service';
import { WorkOrderLogsController } from './work-order-logs.controller';
import { WorkOrderLog } from '../entities/work-order-log.entity';
import { WorkOrder } from '../entities/work-order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkOrderLog, WorkOrder])],
  controllers: [WorkOrderLogsController],
  providers: [WorkOrderLogsService],
  exports: [WorkOrderLogsService],
})
export class WorkOrderLogsModule {}
