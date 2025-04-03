import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User } from './user.entity';
import { UserDto } from 'generated/dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async findMany(): Promise<User[] | null> {
    return this.prisma.user.findMany();
  }

  async createUser(data: UserDto) {
    await this.prisma.user.create(data);
  }
}
