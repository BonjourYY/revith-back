import { Global, Module } from '@nestjs/common';
import { CronService } from './cron.service';

@Global()
@Module({
  providers: [CronService],
})
export class CronModule {}
