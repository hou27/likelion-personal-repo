import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MailService } from 'src/mail/mail.service';
import { CreateAccountBodyDto } from './dto/create-account.dto';
import { LoginBodyDto } from './dto/login.dto';
import { UsersRepository } from 'src/users/users.repository';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  private codes: { [key: string]: number } = {};
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
      const user = await this.userRepository.findOneByEmail(email);
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
    let user = await this.userRepository.findOneByEmail(email);

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
      user = this.userRepository.save(
        this.userRepository.create('unverified', email, 'unverified0'),
      );
    }

    // Email Verification
    const code: string = 'random code';
    this.codes[code] = user.id;

    await this.mailService.sendVerificationEmail(user.email, user.email, code);

    return;
  }

  async verifyEmail(code: string): Promise<void> {
    const userId = this.codes[code];

    if (userId) {
      const user = await this.userRepository.findOneById(userId);
      user.verified = true;
      await this.userRepository.save(user); // verify
      delete this.codes[code];

      return;
    } else {
      throw new NotFoundException('Verification code not found');
    }
  }

  async validateUser(email: string, password: string): Promise<User> {
    try {
      const user = await this.userRepository.findOneByEmail(email);
      if (!user) {
        throw new NotFoundException('User Not Found');
      }

      const isPasswordCorrect = password === user.password;

      if (isPasswordCorrect) {
        return user;
      } else {
        throw new BadRequestException('Wrong Password');
      }
    } catch (e) {
      throw e;
    }
  }
}
