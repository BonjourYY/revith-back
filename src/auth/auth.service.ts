import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { SignatureValidatorService } from 'src/utils/signature/signature.service';

@Injectable()
export class AuthService {
  constructor(
    private signatureValidatorService: SignatureValidatorService,
    private readonly httpService: HttpService,
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

  async getChangGuanAccessToken(code: string) {
    // 定义需要签名的数据
    const signatureObject = {
      grant_type: 'authorization_code',
      timestamp: Math.floor(new Date().getTime() / 1000),
      nonce: this.alphanumeric(16),
      client_id: '2025041415211646',
      client_secret:
        'cd9ecbdea1807821d4a73644c8130bf49bbbc0276f74307110b5ad128ad41715',
      code,
    };

    // 生成签名
    const signature =
      this.signatureValidatorService.generateSignature(signatureObject);

    // 定义 OAuth URL
    const access_token_url = 'https://uctest.xiao5.cn/api/oauth2/access_token';

    // 打印要发送的数据
    console.log({
      ...signatureObject,
      signature,
    });

    // 发送请求
    const access_token_response = await firstValueFrom(
      this.httpService.post(access_token_url, {
        ...signatureObject,
        signature,
      }),
    );

    // 返回结果
    return access_token_response.data;
  }
}
