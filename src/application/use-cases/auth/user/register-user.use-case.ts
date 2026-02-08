import {
  ConflictError,
  ValidationError,
} from '../../../../domain/errors/domain-errors';
import { PasswordHasher } from '../../../ports/auth/password.hasher';
import { SessionRepository } from '../../../ports/auth/session.repository';
import { TokenService } from '../../../ports/auth/token.service';
import { UserRepository } from '../../../ports/users/user.repository';
import { UserProfileRepository } from '../../../ports/users/user-profile.repository';

export class RegisterUserUseCase {
  constructor(
    private readonly users: UserRepository,
    private readonly profiles: UserProfileRepository,
    private readonly sessions: SessionRepository,
    private readonly hasher: PasswordHasher,
    private readonly tokens: TokenService,
  ) {}

  async execute(input: {
    username: string;
    email: string;
    password: string;
    super_user: boolean;
    group_id: number | null;
    profile: {
      first_name: string;
      last_name: string;
      document_type: string | null;
      document_number: string | null;
      phone_number: string | null;
      email_alternative: string | null;
      country_id: number | null;
      city: string | null;
      timezone: string | null;
      address: string | null;
      language: string | null;
      department_id: number | null;
      job_title_id: number | null;
      prefers_dark_mode: boolean | null;
    };
    ip: string | null;
    user_agent: string | null;
  }): Promise<{
    user: {
      id: string;
      username: string;
      email: string;
      super_user: boolean;
      group_id: number | null;
    };
    profile: Record<string, unknown>;
    access_token: string;
    refresh_token: string;
  }> {
    const existing = await this.users.findAuthByEmail(input.email);
    if (existing) {
      throw new ConflictError('Email already registered');
    }

    if (input.super_user && input.group_id !== null) {
      throw new ValidationError('Super user cannot have group_id');
    }
    if (!input.super_user && input.group_id === null) {
      throw new ValidationError('group_id is required for non super user');
    }

    const passwordHash = await this.hasher.hash(input.password);
    const user = await this.users.create({
      username: input.username,
      email: input.email,
      password_hash: passwordHash,
      group_id: input.group_id,
      super_user: input.super_user,
      active: true,
    });

    const profile = await this.profiles.create({
      user_id: user.id,
      first_name: input.profile.first_name,
      last_name: input.profile.last_name,
      document_type: input.profile.document_type,
      document_number: input.profile.document_number,
      phone_number: input.profile.phone_number,
      email_alternative: input.profile.email_alternative,
      country_id: input.profile.country_id,
      city: input.profile.city,
      timezone: input.profile.timezone,
      address: input.profile.address,
      language: input.profile.language,
      department_id: input.profile.department_id,
      job_title_id: input.profile.job_title_id,
      prefers_dark_mode: input.profile.prefers_dark_mode,
    });

    const placeholderRefresh = this.tokens.signRefreshToken({
      sub: user.id,
      sid: '',
    });
    const placeholderHash = await this.hasher.hash(placeholderRefresh);

    const session = await this.sessions.create({
      user_id: user.id,
      refresh_token_hash: placeholderHash,
      ip: input.ip,
      user_agent: input.user_agent,
    });

    const accessToken = this.tokens.signAccessToken({
      sub: user.id,
      sid: session.id,
    });
    const refreshToken = this.tokens.signRefreshToken({
      sub: user.id,
      sid: session.id,
    });
    const refreshHash = await this.hasher.hash(refreshToken);

    await this.sessions.updateRefreshToken({
      id: session.id,
      refresh_token_hash: refreshHash,
    });

    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        super_user: user.super_user,
        group_id: user.group_id,
      },
      profile,
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
