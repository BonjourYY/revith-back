import { Module } from '@nestjs/common';
import { HttpInterceptorService } from './http-interceptor.service';
import { HttpInterceptorController } from './http-interceptor.controller';
import { HttpModule } from '@nestjs/axios';
import { SignatureModule } from 'src/signature/signature.module';

@Module({
  imports: [HttpModule, SignatureModule],
  controllers: [HttpInterceptorController],
  providers: [HttpInterceptorService],
  exports: [HttpInterceptorService],
})
export class HttpInterceptorModule {}
