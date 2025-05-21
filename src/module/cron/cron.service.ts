import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Interval, Timeout } from '@nestjs/schedule';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  // Cron 含义
  // * * * * * *
  // | | | | | |
  // | | | | | day of week
  // | | | | months
  // | | | day of month
  // | | hours
  // | minutes
  // seconds (optional)

  // 声明一个定时任务
  // @Cron(CronExpression.EVERY_10_SECONDS, { name: 'jackfan' })
  // handleCron() {
  //   this.logger.debug('debug');
  // }

  // // 声明一个定时任务
  // @Interval(20000)
  // handleCron2() {
  //   this.logger.error('error');
  // }

  // @Timeout(30000)
  // handlerCron3() {
  //   this.logger.log('log');
  // }
}
