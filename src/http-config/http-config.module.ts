import { Global, Module } from '@nestjs/common';
import { HttpConfigController } from './http-config.controller';
import { HttpModule } from '@nestjs/axios';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HttpService } from '@nestjs/axios';

// 工厂函数：配置 HttpService 的拦截器
export const configureHttpInterceptors = (httpService: HttpService) => {
  return () => {
    httpService.axiosRef.interceptors.request.use(
      (config) => {
        console.log('Global request intercepted:', config.url);
        return config;
      },
      (error) => {
        console.error('Global request interceptor error:', error);
      },
    );
  };
};

@Global()
@Module({
  imports: [HttpModule],
  controllers: [HttpConfigController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      deps: [HttpService],
      useFactory: configureHttpInterceptors,
    },
  ],
})
export class HttpConfigModule {}
