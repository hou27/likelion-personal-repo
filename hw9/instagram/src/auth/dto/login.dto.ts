import { PickType } from '@nestjs/mapped-types';
import { User } from '../../users/entities/user.entity';

export class LoginBodyDto extends PickType(User, ['email', 'password']) {}
