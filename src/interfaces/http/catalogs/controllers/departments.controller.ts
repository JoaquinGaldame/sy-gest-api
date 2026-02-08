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
  CreateDepartmentDto,
  UpdateDepartmentDto,
} from '../dtos/departments.dtos';
import {
  CreateDepartmentUseCase,
  DeleteDepartmentUseCase,
  GetDepartmentUseCase,
  ListDepartmentsUseCase,
  UpdateDepartmentUseCase,
} from '../../../../application/use-cases/catalogs/departments/departments.use-cases';

@Controller('departments')
@UseGuards(JwtAuthGuard)
export class DepartmentController {
  constructor(
    private readonly createDepartment: CreateDepartmentUseCase,
    private readonly listDepartments: ListDepartmentsUseCase,
    private readonly getDepartment: GetDepartmentUseCase,
    private readonly updateDepartment: UpdateDepartmentUseCase,
    private readonly deleteDepartment: DeleteDepartmentUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateDepartmentDto) {
    return this.createDepartment.execute(dto);
  }

  @Get()
  list() {
    return this.listDepartments.execute();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.getDepartment.execute({ id });
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateDepartmentDto,
  ) {
    return this.updateDepartment.execute({ id, ...dto });
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.deleteDepartment.execute({ id });
  }
}
