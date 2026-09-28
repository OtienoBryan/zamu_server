import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseGuards,
  Request,
  BadRequestException,
} from '@nestjs/common';
import { SparePartInventoryService } from './spare-part-inventory.service';
import { SparePartStoreInventory } from '../entities/spare-part-store-inventory.entity';
import { SparePartInventoryLedger } from '../entities/spare-part-inventory-ledger.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateAdjustmentDto } from './dto/create-adjustment.dto';
import { SetQuantityDto } from './dto/set-quantity.dto';
import { TransferDto } from './dto/transfer.dto';

@Controller('spare-part-inventory')
@UseGuards(JwtAuthGuard)
export class SparePartInventoryController {
  constructor(private readonly inventoryService: SparePartInventoryService) {}

  @Get()
  async findAllInventory(): Promise<SparePartStoreInventory[]> {
    return this.inventoryService.findAllInventory();
  }

  @Get('ledger')
  async findLedger(@Query('sparePartId') sparePartId?: string): Promise<SparePartInventoryLedger[]> {
    if (sparePartId != null && sparePartId !== '') {
      const id = Number(sparePartId);
      if (Number.isNaN(id)) {
        throw new BadRequestException('sparePartId must be a number');
      }
      return this.inventoryService.findLedger(id);
    }
    return this.inventoryService.findLedger();
  }

  @Post('adjust')
  async createAdjustment(@Body() dto: CreateAdjustmentDto, @Request() req): Promise<SparePartInventoryLedger> {
    return this.inventoryService.createAdjustment(dto, req.user.sub);
  }

  @Post('set-quantity')
  async setQuantity(@Body() dto: SetQuantityDto, @Request() req): Promise<SparePartInventoryLedger> {
    return this.inventoryService.setQuantity(dto, req.user.sub);
  }

  @Post('transfer')
  async transfer(
    @Body() dto: TransferDto,
    @Request() req,
  ): Promise<{ from: SparePartInventoryLedger; to: SparePartInventoryLedger }> {
    return this.inventoryService.transfer(dto, req.user.sub);
  }
}
