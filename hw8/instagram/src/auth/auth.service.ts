import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MailService } from 'src/mail/mail.service';
import { CreateAccountBodyDto } from './dto/create-account.dto';
import { LoginBodyDto } from './dto/login.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersRepository } from 'src/users/repository/users.repository';

@Injectable()
export class AuthService {
  private verificationCodeStore: Record<string, number> = {}; // redis 대체용 verification code 저장소
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly mailService: MailService,
  ) {}

  async register({
    email,
    name,
    password,
  }: CreateAccountBodyDto): Promise<void> {
    try {
      const user = await this.userRepository.findOneBy({ email });
      if (!user) {
        throw new NotFoundException('User Not Exist');
      }
      if (user.verified) {
        user.name = name;
        user.password = password;
        await this.userRepository.save(user);
        return;
      } else {
        throw new NotFoundException('User is not verified');
      }
    } catch (e) {
      throw e;
    }
  }

  async login({ email, password }: LoginBodyDto): Promise<number> {
    try {
      const user = await this.validateUser(email, password);

      return user.id;
    } catch (e) {
      throw e;
    }
  }

  async sendVerifyEmail(email: string): Promise<void> {
    let user = await this.userRepository.findOneBy({ email });

    if (user) {
      if (user.verified) {
        if (!user.name) {
          throw new ConflictException(
            'User is already verified now. Please register',
          );
        } else {
          throw new ConflictException('User already exists with this email');
        }
      }
    } else {
      user = await this.userRepository.save(
        this.userRepository.create({
          name: 'unverified user',
          email,
          password: 'unverified user',
          birth: new Date(),
        }),
      );
    }

    // Email Verification
    const code: string = 'random code';
    this.verificationCodeStore[code] = user.id;

    await this.mailService.sendVerificationEmail(user.email, user.email, code);

    return;
  }

  async verifyEmail(code: string): Promise<void> {
    const userId = this.verificationCodeStore[code];

    if (userId) {
      const user = await this.userRepository.findOneBy({ id: userId });
      user.verified = true;
      await this.userRepository.save(user); // verify
      delete this.verificationCodeStore[code];

      return;
    } else {
      throw new NotFoundException('Verification code not found');
    }
  }

  async validateUser(email: string, password: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { email },
        select: { id: true, password: true },
      });
      if (!user) {
        throw new NotFoundException('User Not Found');
      }

      if (password === user.password) {
        return user;
      } else {
        throw new BadRequestException('Wrong Password');
      }
    } catch (e) {
      throw e;
    }
  }
}
