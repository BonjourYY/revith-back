import { Controller, Get } from '@nestjs/common';
import { TestService } from './test.service';
import { CacheTTL } from '@nestjs/cache-manager';

@Controller('test')
@CacheTTL(1000)
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get()
  findAll() {
    return this.testService.findAll();
  }
}
