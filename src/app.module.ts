import { ClassSerializerInterceptor, Module, NestModule } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './module/auth/auth.module';
import { SignatureModule } from './utils/signature/signature.module';

import { Oauth2Module } from './module/oauth2/oauth2.module';
import { HttpInterceptorModule } from './common/interceptors/http-interceptor/http-interceptor.module';
import { UserModule } from './module/user/user.module';
import configuration from './config/configuration';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { providePrismaClientExceptionFilter } from 'nestjs-prisma';
import { RolesGuard } from './common/guards/roles.guard';
import { PrismaModule } from './module/prisma/prisma.module';
import { AuthGuard } from './common/guards/auth.guards';
import { DevtoolsModule } from '@nestjs/devtools-integration';

@Module({
  imports: [
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      skipProcessEnv: true,
    }),
    AuthModule,
    SignatureModule,
    Oauth2Module,
    HttpInterceptorModule,
    UserModule,
    PrismaModule,
    CacheModule.register({ ttl: 5000, isGlobal: true }),
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
  constructor(private configService: ConfigService) {
    console.log('DATABASE_URL:', this.configService.get('databaseUrl')); // 调试输出
  }
  configure() {}
}
