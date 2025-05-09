import { ClassSerializerInterceptor, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './module/auth/auth.module';
import { SignatureModule } from './utils/signature/signature.module';
import { Oauth2Module } from './module/oauth2/oauth2.module';
import { HttpInterceptorModule } from './common/interceptors/http-interceptor/http-interceptor.module';
import { UserModule } from './module/user/user.module';
import DatabaseConfig from './config/database.config';
import AppConfig from './config/app.config';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { providePrismaClientExceptionFilter } from 'nestjs-prisma';
import { RolesGuard } from './common/guards/roles.guard';
import { PrismaModule } from './module/prisma/prisma.module';
import { AuthGuard } from './common/guards/auth.guards';
import { BaseModule } from './module/base/base.module';
import { UploadModule } from './module/upload/upload.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronModule } from './module/cron/cron.module';

@Module({
  imports: [
    CronModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`],
      load: [DatabaseConfig, AppConfig],
      skipProcessEnv: true,
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    SignatureModule,
    Oauth2Module,
    HttpInterceptorModule,
    UserModule,
    PrismaModule,
    BaseModule,
    UploadModule,
    CacheModule.register({ ttl: 1000, isGlobal: true }),
  ],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: CacheInterceptor },
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    providePrismaClientExceptionFilter(),
  ],
})
export class AppModule implements NestModule {
  constructor(private configService: ConfigService) {}
  configure() {}
}
