import { $Enums, User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
  roles: $Enums.Role[];
  id: number;
  telephone: string;
  @Exclude()
  password: string;
  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;
}
