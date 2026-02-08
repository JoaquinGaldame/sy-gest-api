import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import type { AuthRequest } from '../../auth/guards/jwt-auth.guard';
import { CreateWarehouseDto, UpdateWarehouseDto } from '../dtos/warehouse.dtos';
import {
  CreateWarehouseUseCase,
  DeleteWarehouseUseCase,
  GetWarehouseUseCase,
  ListWarehousesUseCase,
  UpdateWarehouseUseCase,
} from '../../../../application/use-cases/organization/warehouse/warehouse.use-cases';

@Controller('warehouses')
@UseGuards(JwtAuthGuard)
export class WarehouseController {
  constructor(
    private readonly createWarehouse: CreateWarehouseUseCase,
    private readonly listWarehouses: ListWarehousesUseCase,
    private readonly getWarehouse: GetWarehouseUseCase,
    private readonly updateWarehouse: UpdateWarehouseUseCase,
    private readonly deleteWarehouse: DeleteWarehouseUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateWarehouseDto, @Req() req: AuthRequest) {
    return this.createWarehouse.execute({
      user_id: req.user.sub,
      branch_id: dto.branch_id,
      code: dto.code,
      name: dto.name,
      description: dto.description ?? null,
      max_rows: dto.max_rows,
      max_columns: dto.max_columns,
    });
  }

  @Get()
  list(@Req() req: AuthRequest) {
    return this.listWarehouses.execute({ user_id: req.user.sub });
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number, @Req() req: AuthRequest) {
    return this.getWarehouse.execute({ user_id: req.user.sub, id });
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateWarehouseDto,
    @Req() req: AuthRequest,
  ) {
    return this.updateWarehouse.execute({
      user_id: req.user.sub,
      id,
      branch_id: dto.branch_id,
      code: dto.code,
      name: dto.name,
      description: dto.description ?? null,
      max_rows: dto.max_rows,
      max_columns: dto.max_columns,
    });
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number, @Req() req: AuthRequest) {
    return this.deleteWarehouse.execute({ user_id: req.user.sub, id });
  }
}
