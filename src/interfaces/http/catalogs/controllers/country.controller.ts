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
import { CreateCountryDto, UpdateCountryDto } from '../dtos/country.dtos';
import {
  CreateCountryUseCase,
  DeleteCountryUseCase,
  GetCountryUseCase,
  ListCountriesUseCase,
  UpdateCountryUseCase,
} from '../../../../application/use-cases/catalogs/country/country.use-cases';

@Controller('countries')
@UseGuards(JwtAuthGuard)
export class CountryController {
  constructor(
    private readonly createCountry: CreateCountryUseCase,
    private readonly listCountries: ListCountriesUseCase,
    private readonly getCountry: GetCountryUseCase,
    private readonly updateCountry: UpdateCountryUseCase,
    private readonly deleteCountry: DeleteCountryUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateCountryDto) {
    return this.createCountry.execute(dto);
  }

  @Get()
  list() {
    return this.listCountries.execute();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.getCountry.execute({ id });
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCountryDto) {
    return this.updateCountry.execute({ id, ...dto });
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.deleteCountry.execute({ id });
  }
}
