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
import { MachineInventoryService } from './machine-inventory.service';
import { MachineStoreInventory } from '../entities/machine-store-inventory.entity';
import { MachineInventoryLedger } from '../entities/machine-inventory-ledger.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateAdjustmentDto } from './dto/create-adjustment.dto';
import { SetQuantityDto } from './dto/set-quantity.dto';
import { TransferDto } from './dto/transfer.dto';

@Controller('machine-inventory')
@UseGuards(JwtAuthGuard)
export class MachineInventoryController {
  constructor(private readonly inventoryService: MachineInventoryService) {}

  @Get()
  async findAllInventory(): Promise<MachineStoreInventory[]> {
    return this.inventoryService.findAllInventory();
  }

  @Get('ledger')
  async findLedger(@Query('machineId') machineId?: string): Promise<MachineInventoryLedger[]> {
    if (machineId != null && machineId !== '') {
      const id = Number(machineId);
      if (Number.isNaN(id)) {
        throw new BadRequestException('machineId must be a number');
      }
      return this.inventoryService.findLedger(id);
    }
    return this.inventoryService.findLedger();
  }

  @Post('adjust')
  async createAdjustment(@Body() dto: CreateAdjustmentDto, @Request() req): Promise<MachineInventoryLedger> {
    return this.inventoryService.createAdjustment(dto, req.user.sub);
  }

  @Post('set-quantity')
  async setQuantity(@Body() dto: SetQuantityDto, @Request() req): Promise<MachineInventoryLedger> {
    return this.inventoryService.setQuantity(dto, req.user.sub);
  }

  @Post('transfer')
  async transfer(
    @Body() dto: TransferDto,
    @Request() req,
  ): Promise<{ from: MachineInventoryLedger; to: MachineInventoryLedger }> {
    return this.inventoryService.transfer(dto, req.user.sub);
  }
}
