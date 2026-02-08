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
import {
  CreateExchangeRateDto,
  UpdateExchangeRateDto,
} from '../dtos/exchange-rate.dtos';
import {
  CreateExchangeRateUseCase,
  DeleteExchangeRateUseCase,
  GetExchangeRateUseCase,
  ListExchangeRatesUseCase,
  UpdateExchangeRateUseCase,
} from '../../../../application/use-cases/catalogs/exchange-rate/exchange-rate.use-cases';

@Controller('exchange-rates')
@UseGuards(JwtAuthGuard)
export class ExchangeRateController {
  constructor(
    private readonly createRate: CreateExchangeRateUseCase,
    private readonly listRates: ListExchangeRatesUseCase,
    private readonly getRate: GetExchangeRateUseCase,
    private readonly updateRate: UpdateExchangeRateUseCase,
    private readonly deleteRate: DeleteExchangeRateUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateExchangeRateDto) {
    return this.createRate.execute(dto);
  }

  @Get()
  list() {
    return this.listRates.execute();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.getRate.execute({ id });
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateExchangeRateDto,
  ) {
    return this.updateRate.execute({ id, ...dto });
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.deleteRate.execute({ id });
  }
}
