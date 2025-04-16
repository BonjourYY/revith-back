import { Controller } from '@nestjs/common';
import { HttpConfigService } from './http-config.service';

@Controller('http-config')
export class HttpConfigController {
  constructor(private readonly httpConfigService: HttpConfigService) {}
}
