import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[] | null> {
    return this.usersService.findMany();
  }

  @Post()
  create(@Body() data: any) {
    return this.usersService.createUser(data);
  }
}
