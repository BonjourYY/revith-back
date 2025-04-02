import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
@Controller({ path: 'cat' })
export class CatsController {
  // 使用 Providers
  constructor(private readonly catsService: CatsService) {}

  @Post()
  create(@Body() cat: Cat) {
    this.catsService.create(cat);
  }

  @Get()
  @UseInterceptors(LoggingInterceptor)
  findAll(): Cat[] {
    return this.catsService.findAll();
  }

  // 使用 @Param 装饰器来提取路由参数
  @Get(':uuid')
  findOne(
    @Param('uuid')
    uuid: string,
  ) {
    return { uuid };
  }
}
