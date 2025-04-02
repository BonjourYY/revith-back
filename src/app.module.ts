import { Module, NestModule } from '@nestjs/common';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './user/users.module';
import { User } from './user/user.entity';
@Module({
  imports: [
    UsersModule,
    CatsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL'),
        entities: [User],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(private configService: ConfigService) {
    console.log('DATABASE_URL:', this.configService.get('DATABASE_URL')); // 调试输出
  }
  configure() {}
}
