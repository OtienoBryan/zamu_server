import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartCategoriesService } from './part-categories.service';
import { PartCategoriesController } from './part-categories.controller';
import { PartCategory } from '../entities/part-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PartCategory])],
  controllers: [PartCategoriesController],
  providers: [PartCategoriesService],
  exports: [PartCategoriesService],
})
export class PartCategoriesModule {}
