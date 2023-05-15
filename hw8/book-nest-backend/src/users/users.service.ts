import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UserInfo } from './UserInfo';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as uuid from 'uuid';

@Injectable()
export class UsersService {
  private readonly users: (UserInfo & { password: string })[];
  constructor(
    // MySQL DB
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    // memory DB
    this.users = [];
  }

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
    const user = await this.userRepository.findOneBy({ email });

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
    await this.userRepository.save(
      this.userRepository.create({
        name,
        email,
        password,
        signupVerifyToken,
      }),
    );
  }

  // private async sendMemberJoinEmail(email: string, signupVerifyToken: string) {
  //   await this.emailService.sendMemberJoinVerification(
  //     email,
  //     signupVerifyToken,
  //   );
  // }

  // async verifyEmail(signupVerifyToken: string): Promise<string> {
  //   // TODO
  //   // 1. DB에서 signupVerifyToken으로 회원 가입 처리중인 유저가 있는지 조회하고 없다면 에러 처리
  //   // 2. 바로 로그인 상태가 되도록 JWT를 발급

  //   throw new Error('Method not implemented.');
  // }

  login(email: string, password: string): string {
    // 1. email, password를 가진 유저가 존재하는지 DB에서 확인하고 없다면 에러 처리
    // TODO : 2. JWT를 발급

    const userInfo = this.users.find(
      (user) => user.email === email && user.password === password,
    );
    if (!userInfo) {
      throw new Error('User not found');
    }
    return 'login success';
  }

  getUserInfo(userId: string): UserInfo {
    // 1. userId를 가진 유저가 존재하는지 DB에서 확인하고 없다면 에러 처리
    // 2. 조회된 데이터를 UserInfo 타입으로 응답

    const userInfo = this.users.find((user) => user.id === userId);
    if (!userInfo) {
      throw new Error('User not found');
    }
    return userInfo;
  }
}
