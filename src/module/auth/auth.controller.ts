import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  SerializeOptions,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserEntity } from '../user/entities/user.entity';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  @SerializeOptions({ type: UserEntity })
  signIn(@Body() signInDto: Record<string, string>) {
    return this.authService.signIn(signInDto.telephone, signInDto.password);
  }

  @Get('profile')
  @SerializeOptions({ type: UserEntity })
  getProfile(@Req() req) {
    const userId = req.user.sub;
    return this.authService.getProfile(userId);
  }
}
