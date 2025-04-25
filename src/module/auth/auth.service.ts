import {
  Injectable,
  NotFoundException,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(tel: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.userService.findOneByTel(tel);

    if (!user) {
      throw new UnauthorizedException();
    }

    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = {
      sub: user.id,
      telephone: user.telephone,
      roles: user.roles,
    };
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
