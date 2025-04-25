import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  telephone: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
