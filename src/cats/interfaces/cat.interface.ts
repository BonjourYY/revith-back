import { IsInt, IsString } from 'class-validator';

export class Cat {
  @IsString()
  name: string;

  @IsInt()
  age: number;

  @IsString()
  breed: string;
}
