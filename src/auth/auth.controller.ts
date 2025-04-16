import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Controller('oauth2')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly httpService: HttpService,
  ) {}

  @Get('wx')
  wxAuth() {
    return {
      url: `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${process.env.APPID}&redirect_uri=${encodeURIComponent(String(process.env.REDIRECT_URI))}&response_type=${process.env.RESPONSE_TYPE}&scope=${process.env.SCOPE}&state=${process.env.STATE}#wechat_redirect`,
    };
  }

  @Post('userinfo')
  async getUserInfo(@Body('code') code: string) {
    // 获取 Access_Token
    const access_token_url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${process.env.APPID}&secret=${process.env.APPSECRET}&code=${code}&grant_type=authorization_code`;
    const access_token_response = await firstValueFrom(
      this.httpService.get(access_token_url),
    );

    // 获取用户信息
    const user_info_url = `https://api.weixin.qq.com/sns/userinfo?access_token=${access_token_response.data.access_token}&openid=${access_token_response.data.openid}&lang=zh_CN`;

    const user_info_response = await firstValueFrom(
      this.httpService.get(user_info_url),
    );

    return user_info_response.data;

    // const access_token_response = await fetch(access_token_url);
    // const data = await access_token_response.json();
    // const access_token = data.access_token;
    // const openid = data.openid;

    // const user_info_response: AxiosResponse<Record<string, any>> =
    //   await axios.get(user_info_url);

    // const user_info_response = await fetch(user_info_url);
    // const data2 = await user_info_response.json();
    // console.log(data2);
    // return user_info_response.data;
  }

  @Post('changguan')
  getChangGuanAccessToken(@Body('code') code: string): any {
    return this.authService.getChangGuanAccessToken(code);
  }

  // 获取微信签名
  @Get('sign')
  async getWxSign() {
    // 获取 Access_Token
    const access_token_res = await fetch(
      'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxc5b4f03bfe42a36c&secret=695ffa5109d87934c3192e4ee51127d7',
    );
    const { access_token } = await access_token_res.json();

    // 获取 jsapi_ticket
    const jsapi_res = await fetch(
      `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${access_token}&type=jsapi`,
    );
    const { ticket } = await jsapi_res.json();

    console.log(ticket);
    return { ticket };
  }

  @Get('test')
  testFn() {
    return { success: 'success' };
  }
}
