import { Body, Controller, Post } from '@nestjs/common';
import { Oauth2Service } from './oauth2.service';

@Controller('oauth2')
export class Oauth2Controller {
  constructor(private readonly oauth2Service: Oauth2Service) {}

  // 微信授权
  @Post('wx')
  OAuth2_WX() {
    return { info: '微信授权' };
  }

  // 常观授权
  @Post('cg')
  OAuth2_CG(@Body() body: Record<string, any>) {
    // return body;
    return this.oauth2Service.OAuth2_CG(body);
  }
}
