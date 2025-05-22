import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  SerializeOptions,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserEntity } from '@/module/user/entities/user.entity';
import { Public } from '@/common/decorators/public.decorator';
import { UserService } from '@/module/user/user.service';
import { CreateUserDto } from '@/module/user/dto/create-user.dto';
import { SignInDto } from './dto/sign-in.dto';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  // 登录
  @Post('login')
  @Public()
  @SerializeOptions({ type: UserEntity })
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  // 注册
  @Post('register')
  @Public()
  @SerializeOptions({ type: UserEntity })
  register(@Body() registerDto: CreateUserDto) {
    return this.userService.create(registerDto);
  }

  // 微信授权
  @Get('wechat/code')
  @Public()
  wechat() {
    const config = this.configService.get<Record<string, string>>('wechat');
    return {
      url: `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${config?.appid}&redirect_uri=${encodeURIComponent(String(config?.redirect_uri))}&response_type=${config?.response_type}&scope=${config?.scope}&state=${config?.state}#wechat_redirect`,
    };
  }

  @Post('wechat/userinfo')
  @Public()
  // getUserInfo() {
  //   return 123;
  // }
  async getUserInfo(@Body('code') code: string) {
    const config = this.configService.get<Record<string, string>>('wechat');
    // 获取 Access_Token
    const access_token_url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${config?.appid}&secret=${config?.appsecret}&code=${code}&grant_type=authorization_code`;
    const access_token_response = await firstValueFrom(
      this.httpService.get(access_token_url, { proxy: false }),
    );
    // 获取用户信息
    const user_info_url = `https://api.weixin.qq.com/sns/userinfo?access_token=${access_token_response.data.access_token}&openid=${access_token_response.data.openid}&lang=zh_CN`;
    const user_info_response = await firstValueFrom(
      this.httpService.get(user_info_url, { proxy: false }),
    );
    return user_info_response.data;
  }

  // 常观授权

  // 获取用户信息
  @Get('profile')
  @SerializeOptions({ type: UserEntity })
  getProfile(@Req() req) {
    const userId = req.user.sub;
    return this.authService.getProfile(userId);
  }
}
