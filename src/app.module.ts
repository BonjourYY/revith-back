import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats.controller';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { CatsService } from './cats.service';
@Module({
  imports: [
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
      port: 8000, // 指定端口
    }),
  ],
  controllers: [CatsController],
  providers: [AppService, CatsService],
})
export class AppModule {}
