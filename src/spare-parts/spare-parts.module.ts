import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SparePartsService } from './spare-parts.service';
import { SparePartsController } from './spare-parts.controller';
import { SparePart } from '../entities/spare-part.entity';
import { SparePartCategory } from '../entities/spare-part-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SparePart, SparePartCategory])],
  controllers: [SparePartsController],
  providers: [SparePartsService],
  exports: [SparePartsService],
})
export class SparePartsModule {}
