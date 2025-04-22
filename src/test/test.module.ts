import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [CacheModule.register()],
  controllers: [TestController],
  providers: [
    {
      provide: TestService,
      useClass: TestService,
    },
  ],
})
export class TestModule {}
