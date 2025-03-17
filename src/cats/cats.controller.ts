import { Body, Controller, Post, Get } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller({ path: 'cat' })
export class CatsController {
  // 使用 Providers
  constructor(private readonly catsService: CatsService) {}

  @Post()
  create(@Body('cat') cat: Cat) {
    this.catsService.create(cat);
  }

  @Get()
  findAll(): Cat[] {
    return this.catsService.findAll();
  }
}
