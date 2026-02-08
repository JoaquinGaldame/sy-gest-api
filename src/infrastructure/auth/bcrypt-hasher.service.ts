import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PasswordHasher } from '../../application/ports/auth/password.hasher';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BcryptHasher implements PasswordHasher {
  constructor(private readonly config: ConfigService) {}

  async hash(value: string): Promise<string> {
    const rounds = Number(this.config.get<string>('BCRYPT_ROUNDS') ?? 10);
    return bcrypt.hash(value, rounds);
  }

  compare(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash);
  }
}
