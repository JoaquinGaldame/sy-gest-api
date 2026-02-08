import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './interfaces/http/auth/controllers/auth.controller';
import { UserGroupController } from './interfaces/http/auth/controllers/user-group.controller';
import { DbModule } from './infrastructure/db/db.module';
import { DbClient } from './infrastructure/db/db.client';
import { JwtTokenService } from './infrastructure/auth/jwt-token.service';
import { BcryptHasher } from './infrastructure/auth/bcrypt-hasher.service';
import { SessionRepositoryPg } from './infrastructure/repositories/auth/session.repository.pg';
import {
  UserRepositoryPg,
  UserProfileRepositoryPg,
  UserGroupRepositoryPg,
} from './infrastructure/repositories/users/user.repository.pg';
import { RegisterUserUseCase } from './application/use-cases/auth/user/register-user.use-case';
import { LoginUserUseCase } from './application/use-cases/auth/session/login-user.use-case';
import { RefreshSessionUseCase } from './application/use-cases/auth/session/refresh-session.use-case';
import { LogoutSessionUseCase } from './application/use-cases/auth/session/logout-session.use-case';
import { GetMeUseCase } from './application/use-cases/users/user/get-me.use-case';
import {
  CreateUserGroupUseCase,
  DeleteUserGroupUseCase,
  GetUserGroupUseCase,
  ListUserGroupsUseCase,
  UpdateUserGroupUseCase,
} from './application/use-cases/auth/user-group/user-group.use-cases';
import {
  PASSWORD_HASHER,
  SESSION_REPO,
  TOKEN_SERVICE,
  USER_GROUP_REPO,
  USER_PROFILE_REPO,
  USER_REPO,
} from './application/ports/tokens';
import { JwtAuthGuard } from './interfaces/http/auth/guards/jwt-auth.guard';
import { UserRepository } from './application/ports/users/user.repository';
import { UserProfileRepository } from './application/ports/users/user-profile.repository';
import { UserGroupRepository } from './application/ports/auth/user-group.repository';
import { SessionRepository } from './application/ports/auth/session.repository';
import { PasswordHasher } from './application/ports/auth/password.hasher';
import { TokenService } from './application/ports/auth/token.service';

@Module({
  imports: [ConfigModule, JwtModule.register({}), DbModule],
  controllers: [AuthController, UserGroupController],
  providers: [
    JwtAuthGuard,
    {
      provide: USER_REPO,
      useFactory: (db: DbClient) => new UserRepositoryPg(db),
      inject: [DbClient],
    },
    {
      provide: USER_PROFILE_REPO,
      useFactory: (db: DbClient) => new UserProfileRepositoryPg(db),
      inject: [DbClient],
    },
    {
      provide: USER_GROUP_REPO,
      useFactory: (db: DbClient) => new UserGroupRepositoryPg(db),
      inject: [DbClient],
    },
    {
      provide: SESSION_REPO,
      useFactory: (db: DbClient) => new SessionRepositoryPg(db),
      inject: [DbClient],
    },
    {
      provide: TOKEN_SERVICE,
      useClass: JwtTokenService,
    },
    {
      provide: PASSWORD_HASHER,
      useClass: BcryptHasher,
    },
    {
      provide: RegisterUserUseCase,
      useFactory: (
        users: UserRepository,
        profiles: UserProfileRepository,
        sessions: SessionRepository,
        hasher: PasswordHasher,
        tokens: TokenService,
      ) => new RegisterUserUseCase(users, profiles, sessions, hasher, tokens),
      inject: [
        USER_REPO,
        USER_PROFILE_REPO,
        SESSION_REPO,
        PASSWORD_HASHER,
        TOKEN_SERVICE,
      ],
    },
    {
      provide: LoginUserUseCase,
      useFactory: (
        users: UserRepository,
        profiles: UserProfileRepository,
        groups: UserGroupRepository,
        sessions: SessionRepository,
        hasher: PasswordHasher,
        tokens: TokenService,
      ) =>
        new LoginUserUseCase(users, profiles, groups, sessions, hasher, tokens),
      inject: [
        USER_REPO,
        USER_PROFILE_REPO,
        USER_GROUP_REPO,
        SESSION_REPO,
        PASSWORD_HASHER,
        TOKEN_SERVICE,
      ],
    },
    {
      provide: RefreshSessionUseCase,
      useFactory: (
        sessions: SessionRepository,
        users: UserRepository,
        hasher: PasswordHasher,
        tokens: TokenService,
      ) => new RefreshSessionUseCase(sessions, users, hasher, tokens),
      inject: [SESSION_REPO, USER_REPO, PASSWORD_HASHER, TOKEN_SERVICE],
    },
    {
      provide: LogoutSessionUseCase,
      useFactory: (sessions: SessionRepository) =>
        new LogoutSessionUseCase(sessions),
      inject: [SESSION_REPO],
    },
    {
      provide: GetMeUseCase,
      useFactory: (
        users: UserRepository,
        profiles: UserProfileRepository,
        groups: UserGroupRepository,
      ) => new GetMeUseCase(users, profiles, groups),
      inject: [USER_REPO, USER_PROFILE_REPO, USER_GROUP_REPO],
    },
    {
      provide: CreateUserGroupUseCase,
      useFactory: (groups: UserGroupRepository) =>
        new CreateUserGroupUseCase(groups),
      inject: [USER_GROUP_REPO],
    },
    {
      provide: ListUserGroupsUseCase,
      useFactory: (groups: UserGroupRepository) =>
        new ListUserGroupsUseCase(groups),
      inject: [USER_GROUP_REPO],
    },
    {
      provide: GetUserGroupUseCase,
      useFactory: (groups: UserGroupRepository) =>
        new GetUserGroupUseCase(groups),
      inject: [USER_GROUP_REPO],
    },
    {
      provide: UpdateUserGroupUseCase,
      useFactory: (groups: UserGroupRepository) =>
        new UpdateUserGroupUseCase(groups),
      inject: [USER_GROUP_REPO],
    },
    {
      provide: DeleteUserGroupUseCase,
      useFactory: (groups: UserGroupRepository) =>
        new DeleteUserGroupUseCase(groups),
      inject: [USER_GROUP_REPO],
    },
  ],
  exports: [
    JwtModule,
    JwtAuthGuard,
    USER_REPO,
    USER_PROFILE_REPO,
    USER_GROUP_REPO,
    PASSWORD_HASHER,
  ],
})
export class AuthModule {}
