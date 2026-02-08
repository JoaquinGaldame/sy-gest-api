import { UnauthorizedError } from '../../../../domain/errors/domain-errors';
import { PasswordHasher } from '../../../ports/auth/password.hasher';
import { SessionRepository } from '../../../ports/auth/session.repository';
import { TokenService } from '../../../ports/auth/token.service';
import { UserRepository } from '../../../ports/users/user.repository';
import { UserProfileRepository } from '../../../ports/users/user-profile.repository';
import { UserGroupRepository } from '../../../ports/auth/user-group.repository';

export class LoginUserUseCase {
  constructor(
    private readonly users: UserRepository,
    private readonly profiles: UserProfileRepository,
    private readonly groups: UserGroupRepository,
    private readonly sessions: SessionRepository,
    private readonly hasher: PasswordHasher,
    private readonly tokens: TokenService,
  ) {}

  async execute(input: {
    email: string;
    password: string;
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
    profile: Record<string, unknown> | null;
    scope: Record<string, unknown> | null;
    access_token: string;
    refresh_token: string;
  }> {
    const user = await this.users.findAuthByEmail(input.email);
    if (!user) {
      throw new UnauthorizedError('Email no registrado.');
    }

    if (!user.active) {
      throw new UnauthorizedError('Usuario con acceso no autorizado.');
    }

    const valid = await this.hasher.compare(input.password, user.password_hash);
    if (!valid) {
      throw new UnauthorizedError('Contraseña Incorrecta.');
    }

    const profile = await this.profiles.findByUserId(user.id);
    const scope = user.group_id
      ? await this.groups.findById(user.group_id)
      : null;

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
      scope,
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
