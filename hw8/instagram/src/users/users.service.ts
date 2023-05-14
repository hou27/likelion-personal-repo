import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  checkDuplicateUsername(username: string): boolean {
    return this.usersRepository.checkDuplicateUsername(username);
  }
}
