import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];

  create(createUserDto: CreateUserDto): User {
    if (this.users.find((user) => user.userId === createUserDto.userId)) {
      throw new ConflictException('User Already Exist');
    }
    const user: User = createUserDto;
    this.users.push(user);

    return user;
  }

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    const user = this.users.find((user) => user.userId === id);
    if (!user) {
      throw new NotFoundException('User Not Exist');
    }
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const { userId, userName } = updateUserDto;
    const userIndex = this.getValidUserIndex(id);

    this.users[userIndex].userId = userId;
    this.users[userIndex].userName = userName;

    return this.users[userIndex];
  }

  remove(id: string) {
    const userIndex = this.getValidUserIndex(id);

    this.users.splice(userIndex, 1);
  }

  /**
   * util functions
   */

  getValidUserIndex(id: string): number {
    const userIndex = this.users.findIndex((user) => user.userId === id);
    if (userIndex === -1) {
      throw new NotFoundException('User Not Exist');
    }
    return userIndex;
  }
}
