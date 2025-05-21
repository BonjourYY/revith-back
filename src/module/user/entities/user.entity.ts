import { $Enums, User } from '@/generated/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
  name: string;
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
