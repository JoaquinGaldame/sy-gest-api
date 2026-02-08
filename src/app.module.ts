import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth.module';
import { UsersModule } from './users.module';
import { OrganizationModule } from './organization.module';
import { CatalogsModule } from './catalogs.module';
import { HealthModule } from './health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    OrganizationModule,
    CatalogsModule,
    HealthModule,
  ],
})
export class AppModule {}
