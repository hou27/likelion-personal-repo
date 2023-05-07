import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersRepository {
  private users: User[] = [
    {
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      name: 'Alice',
      email: 'ataj125@gmail.com',
      password: 'pw',
      birth: new Date(),
      verified: true,
    },
  ];

  private findOneBy(prop: string, value: string | number): User {
    const user = this.users.find((user) => user[prop] === value);
    return user;
  }

  findOneById(id: number): User {
    return this.findOneBy('id', id);
  }

  findOneByName(name: string): User {
    return this.findOneBy('name', name);
  }

  findOneByEmail(email: string): User {
    return this.findOneBy('email', email);
  }

  checkDuplicateUsername(name: string): boolean {
    return !!this.users.find((user) => user.name === name);
  }

  create(name: string, email: string, password: string): User {
    const user: User = {
      id: this.generateNewId(),
      createdAt: new Date(),
      updatedAt: new Date(),
      name,
      email,
      password,
      birth: new Date(),
      verified: false,
    };

    return user;
  }

  save(user: User): User {
    this.users.push(user);

    return user;
  }

  /**
   * util functions
   */

  generateNewId(): number {
    return this.users.length > 0
      ? +this.users[this.users.length - 1].id + 1
      : 1;
  }
}
