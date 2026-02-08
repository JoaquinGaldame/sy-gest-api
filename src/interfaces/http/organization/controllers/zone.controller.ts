import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateZoneDto, UpdateZoneDto } from '../dtos/zone.dtos';
import {
  CreateZoneUseCase,
  DeleteZoneUseCase,
  GetZoneUseCase,
  ListZonesUseCase,
  UpdateZoneUseCase,
} from '../../../../application/use-cases/organization/zone/zone.use-cases';

@Controller('zones')
@UseGuards(JwtAuthGuard)
export class ZoneController {
  constructor(
    private readonly createZone: CreateZoneUseCase,
    private readonly listZones: ListZonesUseCase,
    private readonly getZone: GetZoneUseCase,
    private readonly updateZone: UpdateZoneUseCase,
    private readonly deleteZone: DeleteZoneUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateZoneDto) {
    return this.createZone.execute(dto);
  }

  @Get()
  list() {
    return this.listZones.execute();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.getZone.execute({ id });
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateZoneDto) {
    return this.updateZone.execute({ id, code: dto.code, name: dto.name });
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.deleteZone.execute({ id });
  }
}
