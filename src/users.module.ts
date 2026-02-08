import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth.module';
import { UserController } from './interfaces/http/users/controllers/user.controller';
import { ProfileController } from './interfaces/http/users/controllers/profile.controller';
import {
  CreateUserUseCase,
  GetUserUseCase,
  ListUsersUseCase,
  SoftDeleteUserUseCase,
  UpdateUserUseCase,
} from './application/use-cases/users/user/user.use-cases';
import {
  CreateProfileUseCase,
  GetProfileUseCase,
  UpdateProfileUseCase,
} from './application/use-cases/users/profile/profile.use-cases';
import {
  PASSWORD_HASHER,
  USER_PROFILE_REPO,
  USER_REPO,
} from './application/ports/tokens';
import { UserRepository } from './application/ports/users/user.repository';
import { UserProfileRepository } from './application/ports/users/user-profile.repository';
import { PasswordHasher } from './application/ports/auth/password.hasher';

@Module({
  imports: [ConfigModule, AuthModule],
  controllers: [UserController, ProfileController],
  providers: [
    {
      provide: CreateUserUseCase,
      useFactory: (users: UserRepository, hasher: PasswordHasher) =>
        new CreateUserUseCase(users, hasher),
      inject: [USER_REPO, PASSWORD_HASHER],
    },
    {
      provide: ListUsersUseCase,
      useFactory: (users: UserRepository) => new ListUsersUseCase(users),
      inject: [USER_REPO],
    },
    {
      provide: GetUserUseCase,
      useFactory: (users: UserRepository) => new GetUserUseCase(users),
      inject: [USER_REPO],
    },
    {
      provide: UpdateUserUseCase,
      useFactory: (users: UserRepository) => new UpdateUserUseCase(users),
      inject: [USER_REPO],
    },
    {
      provide: SoftDeleteUserUseCase,
      useFactory: (users: UserRepository) => new SoftDeleteUserUseCase(users),
      inject: [USER_REPO],
    },
    {
      provide: GetProfileUseCase,
      useFactory: (profiles: UserProfileRepository) =>
        new GetProfileUseCase(profiles),
      inject: [USER_PROFILE_REPO],
    },
    {
      provide: CreateProfileUseCase,
      useFactory: (profiles: UserProfileRepository) =>
        new CreateProfileUseCase(profiles),
      inject: [USER_PROFILE_REPO],
    },
    {
      provide: UpdateProfileUseCase,
      useFactory: (profiles: UserProfileRepository) =>
        new UpdateProfileUseCase(profiles),
      inject: [USER_PROFILE_REPO],
    },
  ],
})
export class UsersModule {}
