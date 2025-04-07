import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from 'generated/dto/user/dto/create-user.dto';
import { UserDto } from 'generated/dto/user/dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<UserDto[] | null> {
    return this.usersService.findMany();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() data: CreateUserDto) {
    return this.usersService.createUser(data);
  }
}
