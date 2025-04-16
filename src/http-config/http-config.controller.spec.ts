import { Test, TestingModule } from '@nestjs/testing';
import { HttpConfigController } from './http-config.controller';
import { HttpConfigService } from './http-config.service';

describe('HttpConfigController', () => {
  let controller: HttpConfigController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HttpConfigController],
      providers: [HttpConfigService],
    }).compile();

    controller = module.get<HttpConfigController>(HttpConfigController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
