import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import axios, { AxiosResponse } from 'axios';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('wx')
  wxAuth() {
    return {
      url: `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${process.env.APPID}&redirect_uri=${encodeURIComponent(String(process.env.REDIRECT_URI))}&response_type=${process.env.RESPONSE_TYPE}&scope=${process.env.SCOPE}&state=${process.env.STATE}#wechat_redirect`,
    };
  }

  @Post('userinfo')
  async getUserInfo(@Body() code: string) {
    console.log(code);
    const access_token_url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${process.env.APPID}&secret=${process.env.APPSECRET}&code=${code}&grant_type=authorization_code`;
    const access_token_response: AxiosResponse<{
      access_token: string;
      openid: string;
    }> = await axios.get(access_token_url);
    const access_token = access_token_response.data.access_token;
    const openid = access_token_response.data.openid;
    const user_info_url = `https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}&lang=zh_CN`;
    const user_info_response: AxiosResponse<Record<string, any>> =
      await axios.get(user_info_url);
    return user_info_response.data;
  }
}
