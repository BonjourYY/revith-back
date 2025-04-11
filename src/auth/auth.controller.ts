import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('wx')
  wxAuth() {
    return {
      url: `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${process.env.APPID}&redirect_uri=${encodeURIComponent(String(process.env.REDIRECT_URI))}&response_type=${process.env.RESPONSE_TYPE}&scope=${process.env.SCOPE}&state=${process.env.STATE}#wechat_redirect`,
    };
  }
}
