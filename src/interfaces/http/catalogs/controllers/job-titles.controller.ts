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
import { CreateJobTitleDto, UpdateJobTitleDto } from '../dtos/job-titles.dtos';
import {
  CreateJobTitleUseCase,
  DeleteJobTitleUseCase,
  GetJobTitleUseCase,
  ListJobTitlesUseCase,
  UpdateJobTitleUseCase,
} from '../../../../application/use-cases/catalogs/job-titles/job-titles.use-cases';

@Controller('job-titles')
@UseGuards(JwtAuthGuard)
export class JobTitleController {
  constructor(
    private readonly createJobTitle: CreateJobTitleUseCase,
    private readonly listJobTitles: ListJobTitlesUseCase,
    private readonly getJobTitle: GetJobTitleUseCase,
    private readonly updateJobTitle: UpdateJobTitleUseCase,
    private readonly deleteJobTitle: DeleteJobTitleUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateJobTitleDto) {
    return this.createJobTitle.execute({
      code: dto.code,
      name_es: dto.name_es,
      name_en: dto.name_en,
      department_id: dto.department_id ?? null,
      active: dto.active,
    });
  }

  @Get()
  list() {
    return this.listJobTitles.execute();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.getJobTitle.execute({ id });
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateJobTitleDto,
  ) {
    return this.updateJobTitle.execute({
      id,
      code: dto.code,
      name_es: dto.name_es,
      name_en: dto.name_en,
      department_id: dto.department_id ?? null,
      active: dto.active,
    });
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.deleteJobTitle.execute({ id });
  }
}
