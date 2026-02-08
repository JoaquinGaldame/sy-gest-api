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
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import {
  CreateUserGroupDto,
  UpdateUserGroupDto,
} from '../dtos/user-group.dtos';
import {
  CreateUserGroupUseCase,
  DeleteUserGroupUseCase,
  GetUserGroupUseCase,
  ListUserGroupsUseCase,
  UpdateUserGroupUseCase,
} from '../../../../application/use-cases/auth/user-group/user-group.use-cases';

@Controller('user-groups')
@UseGuards(JwtAuthGuard)
export class UserGroupController {
  constructor(
    private readonly createGroup: CreateUserGroupUseCase,
    private readonly listGroups: ListUserGroupsUseCase,
    private readonly getGroup: GetUserGroupUseCase,
    private readonly updateGroup: UpdateUserGroupUseCase,
    private readonly deleteGroup: DeleteUserGroupUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateUserGroupDto) {
    return this.createGroup.execute({
      code: dto.code,
      name: dto.name,
      zone_id: dto.zone_id ?? null,
      branch_id: dto.branch_id ?? null,
      active: dto.active,
    });
  }

  @Get()
  list() {
    return this.listGroups.execute();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.getGroup.execute({ id });
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserGroupDto,
  ) {
    return this.updateGroup.execute({
      id,
      code: dto.code,
      name: dto.name,
      zone_id: dto.zone_id ?? null,
      branch_id: dto.branch_id ?? null,
      active: dto.active,
    });
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.deleteGroup.execute({ id });
  }
}
