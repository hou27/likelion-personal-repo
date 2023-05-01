import {
  BadRequestException,
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

  findOne(userId: string) {
    const user = this.users.find((user) => user.userId === userId);
    if (!user) {
      throw new NotFoundException('User Not Exist');
    }
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const { userId, userName } = updateUserDto;
    const user = this.users.find((user) => user.userId === id);
    if (!user) {
      throw new BadRequestException('User Not Exist');
    }
    // 해당 유저 정보 제거 후 새로운 정보로 추가
    this.users = this.users.filter((user) => user.userId !== id);
    console.log(this.users);
    user.userId = userId;
    user.userName = userName;
    this.users.push(user);
    console.log('유저 수정 완료');
  }

  remove(userId: string) {
    return `This action removes a #${userId} user`;
  }
}
