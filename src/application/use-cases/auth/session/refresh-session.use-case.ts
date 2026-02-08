import { UnauthorizedError } from '../../../../domain/errors/domain-errors';
import { PasswordHasher } from '../../../ports/auth/password.hasher';
import { SessionRepository } from '../../../ports/auth/session.repository';
import { TokenService } from '../../../ports/auth/token.service';
import { UserRepository } from '../../../ports/users/user.repository';

export class RefreshSessionUseCase {
  constructor(
    private readonly sessions: SessionRepository,
    private readonly users: UserRepository,
    private readonly hasher: PasswordHasher,
    private readonly tokens: TokenService,
  ) {}

  async execute(input: {
    refresh_token: string;
  }): Promise<{ access_token: string; refresh_token: string }> {
    let payload: { sub: string; sid: string };
    try {
      payload = this.tokens.verifyRefreshToken(input.refresh_token);
    } catch {
      throw new UnauthorizedError('Invalid refresh token');
    }

    const session = await this.sessions.findById(payload.sid);
    if (!session || session.revoked_at) {
      throw new UnauthorizedError('Session revoked');
    }

    if (session.user_id !== payload.sub) {
      throw new UnauthorizedError('Invalid session');
    }

    const user = await this.users.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedError('Invalid session');
    }

    const matches = await this.hasher.compare(
      input.refresh_token,
      session.refresh_token_hash,
    );
    if (!matches) {
      throw new UnauthorizedError('Invalid refresh token');
    }

    const accessToken = this.tokens.signAccessToken({
      sub: payload.sub,
      sid: payload.sid,
    });
    const newRefreshToken = this.tokens.signRefreshToken({
      sub: payload.sub,
      sid: payload.sid,
    });
    const newRefreshHash = await this.hasher.hash(newRefreshToken);

    const updated = await this.sessions.updateRefreshToken({
      id: payload.sid,
      refresh_token_hash: newRefreshHash,
    });

    if (!updated) {
      throw new UnauthorizedError('Session revoked');
    }

    return {
      access_token: accessToken,
      refresh_token: newRefreshToken,
    };
  }
}
