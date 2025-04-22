import { Module, NestModule } from '@nestjs/common';
import { AppService } from './app.service';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { SignatureModule } from './signature/signature.module';

import { Oauth2Module } from './oauth2/oauth2.module';
import { HttpInterceptorModule } from './http-interceptor/http-interceptor.module';
import { UserModule } from './module/user/user.module';
import { TestModule } from './test/test.module';
import configuration from './config/configuration';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
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
    TestModule,
    CacheModule.register({ ttl: 5000, isGlobal: true }),
  ],
  providers: [
    { provide: AppService, useClass: AppService },
    { provide: APP_INTERCEPTOR, useClass: CacheInterceptor },
  ],
})
export class AppModule implements NestModule {
  constructor(private configService: ConfigService) {
    console.log('DATABASE_URL:', this.configService.get('databaseUrl')); // 调试输出
  }
  configure() {}
}
