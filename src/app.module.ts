import { Module, NestModule } from '@nestjs/common';
import { AppService } from './app.service';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './user/users.module';

@Module({
  imports: [UsersModule, ConfigModule.forRoot({ isGlobal: true })],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(private configService: ConfigService) {
    console.log('DATABASE_URL:', this.configService.get('DATABASE_URL')); // 调试输出
  }
  configure() {}
}
