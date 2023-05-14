import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async checkDuplicateUsername(username: string): Promise<boolean> {
    const user = await this.findOneBy({ name: username });
    return !!user;
  }
}
