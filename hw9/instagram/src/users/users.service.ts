import { Injectable } from '@nestjs/common';
import { UsersRepository } from './repository/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async checkDuplicateUsername(username: string): Promise<boolean> {
    return this.usersRepository.checkDuplicateUsername(username);
  }
}
