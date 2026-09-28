import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversionClientsService } from './conversion-clients.service';
import { ConversionClientsController } from './conversion-clients.controller';
import { ConversionClient } from '../entities/conversion-client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ConversionClient])],
  controllers: [ConversionClientsController],
  providers: [ConversionClientsService],
  exports: [ConversionClientsService],
})
export class ConversionClientsModule {}
