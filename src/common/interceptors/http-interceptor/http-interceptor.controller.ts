import { Controller } from '@nestjs/common';
import { HttpInterceptorService } from './http-interceptor.service';

@Controller('http-interceptor')
export class HttpInterceptorController {
  constructor(
    private readonly httpInterceptorService: HttpInterceptorService,
  ) {}
}
