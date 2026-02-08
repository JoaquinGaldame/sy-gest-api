import { NotFoundError } from '../../../../domain/errors/domain-errors';
import { UserProfileRepository } from '../../../ports/users/user-profile.repository';

export class GetProfileUseCase {
  constructor(private readonly profiles: UserProfileRepository) {}

  async execute(input: { user_id: string }) {
    const profile = await this.profiles.findByUserId(input.user_id);
    if (!profile) {
      throw new NotFoundError('Profile not found');
    }
    return profile;
  }
}

export class CreateProfileUseCase {
  constructor(private readonly profiles: UserProfileRepository) {}

  execute(input: Parameters<UserProfileRepository['create']>[0]) {
    return this.profiles.create(input);
  }
}

export class UpdateProfileUseCase {
  constructor(private readonly profiles: UserProfileRepository) {}

  async execute(
    input: { user_id: string } & Parameters<UserProfileRepository['update']>[1],
  ) {
    const profile = await this.profiles.update(input.user_id, input);
    if (!profile) {
      throw new NotFoundError('Profile not found');
    }
    return profile;
  }
}
