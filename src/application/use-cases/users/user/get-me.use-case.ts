import { NotFoundError } from '../../../../domain/errors/domain-errors';
import { UserRepository } from '../../../ports/users/user.repository';
import { UserProfileRepository } from '../../../ports/users/user-profile.repository';
import { UserGroupRepository } from '../../../ports/auth/user-group.repository';

export class GetMeUseCase {
  constructor(
    private readonly users: UserRepository,
    private readonly profiles: UserProfileRepository,
    private readonly groups: UserGroupRepository,
  ) {}

  async execute(input: { user_id: string }): Promise<{
    user: {
      id: string;
      username: string;
      email: string;
      super_user: boolean;
      group_id: number | null;
    };
    profile: Record<string, unknown> | null;
    scope: Record<string, unknown> | null;
  }> {
    const user = await this.users.findById(input.user_id);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    const profile = await this.profiles.findByUserId(user.id);
    const scope = user.group_id
      ? await this.groups.findById(user.group_id)
      : null;

    return {
      user,
      profile,
      scope,
    };
  }
}
