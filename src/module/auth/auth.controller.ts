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

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
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
  @Get('wechat')
  @Public()
  wechat() {
    const config = this.configService.get('wechat');
    console.log(config);
    return {
      url: `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${config.appid}&redirect_uri=${encodeURIComponent(String(config.redirect_uri))}&response_type=${config.response_type}&scope=${config.scope}&state=${config.state}#wechat_redirect`,
    };
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
