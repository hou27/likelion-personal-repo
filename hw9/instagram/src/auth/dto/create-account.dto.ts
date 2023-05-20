import { PickType } from '@nestjs/mapped-types';
import { User } from '../../users/entities/user.entity';

export class CreateAccountBodyDto extends PickType(User, [
  'email',
  'name',
  'password',
]) {}
