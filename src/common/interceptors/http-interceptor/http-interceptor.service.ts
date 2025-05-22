import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable, OnModuleInit } from '@nestjs/common';
import { AxiosError } from 'axios';
import { SignatureValidatorService } from 'src/utils/signature/signature.service';

@Injectable()
export class HttpInterceptorService implements OnModuleInit {
  // 依赖注入
  constructor(
    private readonly httpService: HttpService,
    private readonly signatureValidatorService: SignatureValidatorService,
  ) {}

  alphanumeric(length = 16) {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      result += chars[randomIndex];
    }
    return result;
  }

  onModuleInit() {
    // 设置请求拦截器
    this.httpService.axiosRef.interceptors.request.use(
      (config) => {
        // 定义需要签名的数据
        const signatureObject = {
          grant_type: 'authorization_code',
          timestamp: Math.floor(new Date().getTime() / 1000),
          nonce: this.alphanumeric(16),
          client_id: '2025041415211646',
          client_secret:
            'cd9ecbdea1807821d4a73644c8130bf49bbbc0276f74307110b5ad128ad41715',
          ...config.data,
        };

        // 生成签名
        const signature =
          this.signatureValidatorService.generateSignature(signatureObject);

        console.log({ signature });

        config.data = { ...signatureObject, signature };

        console.log(config.data);

        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      },
    );

    // 设置响应拦截器，返回三方接口的内容
    this.httpService.axiosRef.interceptors.response.use(
      (res) => {
        return res.data;
      },
      (error: AxiosError) => {
        throw new HttpException(
          error.response?.data as Record<string, any>,
          error.response?.status as number,
        );
        // return { errMessage: '三方返回错误' };
      },
    );
  }

  get axios() {
    return this.httpService;
  }
}
