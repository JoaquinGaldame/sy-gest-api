import { SessionRepository } from '../../../ports/auth/session.repository';

export class LogoutSessionUseCase {
  constructor(private readonly sessions: SessionRepository) {}

  async execute(input: { session_id: string }): Promise<void> {
    await this.sessions.revoke(input.session_id);
  }
}
