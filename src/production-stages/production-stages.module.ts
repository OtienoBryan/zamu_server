import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductionStagesService } from './production-stages.service';
import { ProductionStagesController } from './production-stages.controller';
import { ProductionStage } from '../entities/production-stage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductionStage])],
  controllers: [ProductionStagesController],
  providers: [ProductionStagesService],
  exports: [ProductionStagesService],
})
export class ProductionStagesModule {}
