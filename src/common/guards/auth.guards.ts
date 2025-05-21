import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '@/common/decorators/public.decorator';
import { jwtConstants } from '@/module/auth/constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 检查是否是公开路由
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // 如果是公开路由，则直接返回 true
    if (isPublic) {
      return true;
    }

    // 获取请求
    const request = context.switchToHttp().getRequest<Request>();

    // 获取 token
    const token = this.extractTokenFromHeader(request);

    // 如果 token 不存在，则抛出异常
    if (!token) {
      throw new UnauthorizedException();
    }

    // 验证 token
    try {
      const payload = await this.jwtService.verifyAsync<Record<string, any>>(
        token,
        {
          secret: jwtConstants.secret,
        },
      );

      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  // 提取 token 从请求头
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
