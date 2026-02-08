import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dtos';
import {
  CreateUserUseCase,
  GetUserUseCase,
  ListUsersUseCase,
  UpdateUserUseCase,
  SoftDeleteUserUseCase,
} from '../../../../application/use-cases/users/user/user.use-cases';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(
    @Inject(CreateUserUseCase) private readonly createUser: CreateUserUseCase,
    @Inject(ListUsersUseCase) private readonly listUsers: ListUsersUseCase,
    @Inject(GetUserUseCase) private readonly getUser: GetUserUseCase,
    @Inject(UpdateUserUseCase) private readonly updateUser: UpdateUserUseCase,
    @Inject(SoftDeleteUserUseCase)
    private readonly deleteUser: SoftDeleteUserUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.createUser.execute({
      username: dto.username,
      email: dto.email,
      password: dto.password,
      group_id: dto.group_id ?? null,
      super_user: dto.super_user,
      active: dto.active,
    });
  }

  @Get()
  list() {
    return this.listUsers.execute();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.getUser.execute({ id });
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.updateUser.execute({
      id,
      username: dto.username,
      email: dto.email,
      group_id: dto.group_id ?? null,
      super_user: dto.super_user,
      active: dto.active,
    });
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.deleteUser.execute({ id });
  }
}
