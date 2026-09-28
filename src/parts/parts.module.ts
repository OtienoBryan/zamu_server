import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartsService } from './parts.service';
import { PartsController } from './parts.controller';
import { Part } from '../entities/part.entity';
import { PartInventory } from '../entities/part-inventory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Part, PartInventory])],
  controllers: [PartsController],
  providers: [PartsService],
  exports: [PartsService],
})
export class PartsModule {}

