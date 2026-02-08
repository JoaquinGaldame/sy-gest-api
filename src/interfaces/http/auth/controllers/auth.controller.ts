import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { LoginUserUseCase } from '../../../../application/use-cases/auth/session/login-user.use-case';
import { RegisterUserUseCase } from '../../../../application/use-cases/auth/user/register-user.use-case';
import { RefreshSessionUseCase } from '../../../../application/use-cases/auth/session/refresh-session.use-case';
import { LogoutSessionUseCase } from '../../../../application/use-cases/auth/session/logout-session.use-case';
import { GetMeUseCase } from '../../../../application/use-cases/users/user/get-me.use-case';
import { LoginDto, RefreshDto, RegisterDto } from '../dtos/auth.dtos';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import type { AuthRequest } from '../guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUser: RegisterUserUseCase,
    private readonly loginUser: LoginUserUseCase,
    private readonly refreshSession: RefreshSessionUseCase,
    private readonly logoutSession: LogoutSessionUseCase,
    private readonly getMe: GetMeUseCase,
  ) {}

  @Post('register')
  register(@Body() dto: RegisterDto, @Req() req: AuthRequest) {
    return this.registerUser.execute({
      username: dto.username,
      email: dto.email,
      password: dto.password,
      super_user: dto.super_user ?? false,
      group_id: dto.group_id ?? null,
      profile: {
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
      },
      ip: req.ip ?? null,
      user_agent: req.headers['user-agent'] ?? null,
    });
  }

  @Post('login')
  login(@Body() dto: LoginDto, @Req() req: AuthRequest) {
    return this.loginUser.execute({
      email: dto.email,
      password: dto.password,
      ip: req.ip ?? null,
      user_agent: req.headers['user-agent'] ?? null,
    });
  }

  @Post('refresh')
  refresh(@Body() dto: RefreshDto) {
    return this.refreshSession.execute({ refresh_token: dto.refresh_token });
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() req: AuthRequest) {
    await this.logoutSession.execute({ session_id: req.user.sid });
    return { ok: true };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Req() req: AuthRequest) {
    return this.getMe.execute({ user_id: req.user.sub });
  }
}
