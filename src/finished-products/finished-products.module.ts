import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinishedProductsService } from './finished-products.service';
import { FinishedProductsController } from './finished-products.controller';
import { FinishedProduct } from '../entities/finished-product.entity';
import { FinishedProductCategory } from '../entities/finished-product-category.entity';
import { FinishedProductMaterial } from '../entities/finished-product-material.entity';
import { RawMaterial } from '../entities/raw-material.entity';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FinishedProduct, FinishedProductCategory, FinishedProductMaterial, RawMaterial]),
    CloudinaryModule,
  ],
  controllers: [FinishedProductsController],
  providers: [FinishedProductsService],
  exports: [FinishedProductsService],
})
export class FinishedProductsModule {}
