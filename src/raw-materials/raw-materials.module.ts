import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RawMaterialsService } from './raw-materials.service';
import { RawMaterialsController } from './raw-materials.controller';
import { RawMaterial } from '../entities/raw-material.entity';
import { RawMaterialCategory } from '../entities/raw-material-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RawMaterial, RawMaterialCategory])],
  controllers: [RawMaterialsController],
  providers: [RawMaterialsService],
  exports: [RawMaterialsService],
})
export class RawMaterialsModule {}
