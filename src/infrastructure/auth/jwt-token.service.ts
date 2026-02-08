import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import {
  TokenPayload,
  TokenService,
} from '../../application/ports/auth/token.service';

@Injectable()
export class JwtTokenService implements TokenService {
  constructor(
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  signAccessToken(payload: TokenPayload): string {
    const secret = this.config.get<string>('JWT_ACCESS_SECRET');
    const expiresIn = (this.config.get<string>('JWT_ACCESS_TTL') ??
      '15m') as JwtSignOptions['expiresIn'];
    return this.jwt.sign(payload, { secret, expiresIn });
  }

  signRefreshToken(payload: TokenPayload): string {
    const secret = this.config.get<string>('JWT_REFRESH_SECRET');
    const expiresIn = (this.config.get<string>('JWT_REFRESH_TTL') ??
      '30d') as JwtSignOptions['expiresIn'];
    return this.jwt.sign(payload, { secret, expiresIn });
  }

  verifyRefreshToken(token: string): TokenPayload {
    const secret = this.config.get<string>('JWT_REFRESH_SECRET');
    return this.jwt.verify<TokenPayload>(token, { secret });
  }
}
