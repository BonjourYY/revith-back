import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<{ access_token: string }> {
    // 查询用户
    const user = await this.userService.findOneByTel(signInDto.telephone);

    // 用户不存在
    if (!user) {
      throw new UnauthorizedException();
    }

    // 密码不正确
    if (user?.password !== signInDto.password) {
      throw new UnauthorizedException();
    }

    // 生成 token
    const payload = {
      sub: user.id,
      telephone: user.telephone,
      name: user.name,
      roles: user.roles,
    };

    // 返回 token
    return { access_token: await this.jwtService.signAsync(payload) };
  }

  async getProfile(userId) {
    const user = await this.userService.findOne(userId);
    if (!user) {
      // 理论上，如果 token 有效，用户应该存在，但这是一种防御性编程
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }
    return user; // 直接返回查询到的 UserEntity
  }
}
