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
import { CreateBranchDto, UpdateBranchDto } from '../dtos/branch.dtos';
import {
  CreateBranchUseCase,
  DeleteBranchUseCase,
  GetBranchUseCase,
  ListBranchesUseCase,
  UpdateBranchUseCase,
} from '../../../../application/use-cases/organization/branch/branch.use-cases';

@Controller('branches')
@UseGuards(JwtAuthGuard)
export class BranchController {
  constructor(
    private readonly createBranch: CreateBranchUseCase,
    private readonly listBranches: ListBranchesUseCase,
    private readonly getBranch: GetBranchUseCase,
    private readonly updateBranch: UpdateBranchUseCase,
    private readonly deleteBranch: DeleteBranchUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateBranchDto, @Req() req: AuthRequest) {
    return this.createBranch.execute({
      user_id: req.user.sub,
      company_id: dto.company_id,
      zone_id: dto.zone_id,
      code: dto.code,
      name: dto.name,
    });
  }

  @Get()
  list(@Req() req: AuthRequest) {
    return this.listBranches.execute({ user_id: req.user.sub });
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number, @Req() req: AuthRequest) {
    return this.getBranch.execute({ user_id: req.user.sub, id });
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateBranchDto,
    @Req() req: AuthRequest,
  ) {
    return this.updateBranch.execute({
      user_id: req.user.sub,
      id,
      company_id: dto.company_id,
      zone_id: dto.zone_id,
      code: dto.code,
      name: dto.name,
    });
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number, @Req() req: AuthRequest) {
    return this.deleteBranch.execute({ user_id: req.user.sub, id });
  }
}
