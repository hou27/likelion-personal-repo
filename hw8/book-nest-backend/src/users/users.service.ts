import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserInfo } from './UserInfo';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as uuid from 'uuid';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    // MySQL DB
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  async createUser(name: string, email: string, password: string) {
    if (await this.checkUserExists(email)) {
      throw new UnprocessableEntityException('이미 존재하는 이메일입니다.');
    }

    const signupVerifyToken = uuid.v1();

    this.saveUser(name, email, password, signupVerifyToken);
    // await this.sendMemberJoinEmail(email, signupVerifyToken);
  }

  private async checkUserExists(email: string): Promise<boolean> {
    // return this.users.some((user) => user.email === email);
    const user = await this.usersRepository.findOneBy({ email });

    return !!user;
  }

  private async saveUser(
    name: string,
    email: string,
    password: string,
    signupVerifyToken: string,
  ) {
    // this.users.push({
    //   id: (this.users.length > 0
    //     ? +this.users[this.users.length - 1].id + 1
    //     : 1
    //   ).toString(),
    //   name,
    //   email,
    //   password,
    // });
    await this.usersRepository.save(
      this.usersRepository.create({
        name,
        email,
        password,
        signupVerifyToken,
      }),
    );
  }

  async login(email: string, password: string): Promise<string> {
    // 1. email, password를 가진 유저가 존재하는지 DB에서 확인하고 없다면 에러 처리
    // TODO : 2. JWT를 발급

    const user = await this.usersRepository.findOne({
      where: { email, password },
    });
    if (!user) {
      throw new Error('User not found');
    }
    return this.authService.login({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  }

  async getUserInfo(userId: string): Promise<UserInfo> {
    const user = await this.usersRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
