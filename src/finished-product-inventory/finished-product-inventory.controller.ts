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
import { FinishedProductInventoryService } from './finished-product-inventory.service';
import { FinishedProductStoreInventory } from '../entities/finished-product-store-inventory.entity';
import { FinishedProductInventoryLedger } from '../entities/finished-product-inventory-ledger.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateAdjustmentDto } from './dto/create-adjustment.dto';
import { SetQuantityDto } from './dto/set-quantity.dto';
import { TransferDto } from './dto/transfer.dto';

@Controller('finished-product-inventory')
@UseGuards(JwtAuthGuard)
export class FinishedProductInventoryController {
  constructor(private readonly inventoryService: FinishedProductInventoryService) {}

  @Get()
  async findAllInventory(): Promise<FinishedProductStoreInventory[]> {
    return this.inventoryService.findAllInventory();
  }

  @Get('ledger')
  async findLedger(@Query('productId') productId?: string): Promise<FinishedProductInventoryLedger[]> {
    if (productId != null && productId !== '') {
      const id = Number(productId);
      if (Number.isNaN(id)) {
        throw new BadRequestException('productId must be a number');
      }
      return this.inventoryService.findLedger(id);
    }
    return this.inventoryService.findLedger();
  }

  @Post('adjust')
  async createAdjustment(@Body() dto: CreateAdjustmentDto, @Request() req): Promise<FinishedProductInventoryLedger> {
    return this.inventoryService.createAdjustment(dto, req.user.sub);
  }

  @Post('set-quantity')
  async setQuantity(@Body() dto: SetQuantityDto, @Request() req): Promise<FinishedProductInventoryLedger> {
    return this.inventoryService.setQuantity(dto, req.user.sub);
  }

  @Post('transfer')
  async transfer(
    @Body() dto: TransferDto,
    @Request() req,
  ): Promise<{ from: FinishedProductInventoryLedger; to: FinishedProductInventoryLedger }> {
    return this.inventoryService.transfer(dto, req.user.sub);
  }
}
