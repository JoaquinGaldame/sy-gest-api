import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateProfileDto, UpdateProfileDto } from '../dtos/profile.dtos';
import {
  CreateProfileUseCase,
  GetProfileUseCase,
  UpdateProfileUseCase,
} from '../../../../application/use-cases/users/profile/profile.use-cases';

@Controller('profiles')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(
    @Inject(GetProfileUseCase) private readonly getProfile: GetProfileUseCase,
    @Inject(CreateProfileUseCase)
    private readonly createProfile: CreateProfileUseCase,
    @Inject(UpdateProfileUseCase)
    private readonly updateProfile: UpdateProfileUseCase,
  ) {}

  @Get(':user_id')
  get(@Param('user_id') user_id: string) {
    return this.getProfile.execute({ user_id });
  }

  @Post()
  create(@Body() dto: CreateProfileDto) {
    return this.createProfile.execute({
      user_id: dto.user_id,
      first_name: dto.first_name,
      last_name: dto.last_name,
      document_type: dto.document_type ?? null,
      document_number: dto.document_number ?? null,
      phone_number: dto.phone_number ?? null,
      email_alternative: dto.email_alternative ?? null,
      country_id: dto.country_id ?? null,
      city: dto.city ?? null,
      timezone: dto.timezone ?? null,
      address: dto.address ?? null,
      language: dto.language ?? null,
      department_id: dto.department_id ?? null,
      job_title_id: dto.job_title_id ?? null,
      prefers_dark_mode: dto.prefers_dark_mode ?? null,
    });
  }

  @Put(':user_id')
  update(@Param('user_id') user_id: string, @Body() dto: UpdateProfileDto) {
    return this.updateProfile.execute({
      user_id,
      first_name: dto.first_name,
      last_name: dto.last_name,
      document_type: dto.document_type ?? null,
      document_number: dto.document_number ?? null,
      phone_number: dto.phone_number ?? null,
      email_alternative: dto.email_alternative ?? null,
      country_id: dto.country_id ?? null,
      city: dto.city ?? null,
      timezone: dto.timezone ?? null,
      address: dto.address ?? null,
      language: dto.language ?? null,
      department_id: dto.department_id ?? null,
      job_title_id: dto.job_title_id ?? null,
      prefers_dark_mode: dto.prefers_dark_mode ?? null,
    });
  }
}
