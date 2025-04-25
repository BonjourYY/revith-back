import { Module } from '@nestjs/common';
import { Oauth2Service } from './oauth2.service';
import { Oauth2Controller } from './oauth2.controller';
import { HttpInterceptorModule } from 'src/common/interceptors/http-interceptor/http-interceptor.module';

@Module({
  imports: [HttpInterceptorModule],
  controllers: [Oauth2Controller],
  providers: [Oauth2Service],
})
export class Oauth2Module {}
