import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChecklistTemplatesService } from './checklist-templates.service';
import { ChecklistTemplatesController } from './checklist-templates.controller';
import { ChecklistTemplate } from '../entities/checklist-template.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChecklistTemplate])],
  controllers: [ChecklistTemplatesController],
  providers: [ChecklistTemplatesService],
  exports: [ChecklistTemplatesService],
})
export class ChecklistTemplatesModule {}
