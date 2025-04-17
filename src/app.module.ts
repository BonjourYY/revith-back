import { Module, NestModule } from '@nestjs/common';
import { AppService } from './app.service';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { SignatureModule } from './signature/signature.module';

import { Oauth2Module } from './oauth2/oauth2.module';
import { HttpInterceptorModule } from './http-interceptor/http-interceptor.module';
import configuration from './config/configuration';

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
  ],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(private configService: ConfigService) {
    console.log('DATABASE_URL:', this.configService.get('databaseUrl')); // 调试输出
  }
  configure() {}
}
