import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OmcsService } from './omcs.service';
import { OmcsController } from './omcs.controller';
import { Omc } from '../entities/omc.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Omc])],
  controllers: [OmcsController],
  providers: [OmcsService],
  exports: [OmcsService],
})
export class OmcsModule {}
