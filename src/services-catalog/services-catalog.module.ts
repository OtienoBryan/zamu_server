import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesCatalogService } from './services-catalog.service';
import { ServicesCatalogController } from './services-catalog.controller';
import { Service } from '../entities/service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Service])],
  controllers: [ServicesCatalogController],
  providers: [ServicesCatalogService],
  exports: [ServicesCatalogService],
})
export class ServicesCatalogModule {}
