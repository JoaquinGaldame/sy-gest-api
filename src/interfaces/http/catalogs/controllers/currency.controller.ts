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
import { CreateCurrencyDto, UpdateCurrencyDto } from '../dtos/currency.dtos';
import {
  CreateCurrencyUseCase,
  DeleteCurrencyUseCase,
  GetCurrencyUseCase,
  ListCurrenciesUseCase,
  UpdateCurrencyUseCase,
} from '../../../../application/use-cases/catalogs/currency/currency.use-cases';

@Controller('currencies')
@UseGuards(JwtAuthGuard)
export class CurrencyController {
  constructor(
    private readonly createCurrency: CreateCurrencyUseCase,
    private readonly listCurrencies: ListCurrenciesUseCase,
    private readonly getCurrency: GetCurrencyUseCase,
    private readonly updateCurrency: UpdateCurrencyUseCase,
    private readonly deleteCurrency: DeleteCurrencyUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateCurrencyDto) {
    return this.createCurrency.execute({
      code: dto.code,
      name_en: dto.name_en,
      name_es: dto.name_es,
      symbol: dto.symbol ?? null,
      minor_unit: dto.minor_unit,
      active: dto.active,
    });
  }

  @Get()
  list() {
    return this.listCurrencies.execute();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.getCurrency.execute({ id });
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCurrencyDto,
  ) {
    return this.updateCurrency.execute({
      id,
      code: dto.code,
      name_en: dto.name_en,
      name_es: dto.name_es,
      symbol: dto.symbol ?? null,
      minor_unit: dto.minor_unit,
      active: dto.active,
    });
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.deleteCurrency.execute({ id });
  }
}
