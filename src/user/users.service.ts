import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

import { user, Prisma } from 'generated/prisma';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  // 获取所有用户
  async findMany(): Promise<user[] | null> {
    return this.prisma.user.findMany();
  }

  // 创建用户
  async createUser(data: Prisma.userCreateInput) {
    await this.prisma.user.create({ data });
  }
}
