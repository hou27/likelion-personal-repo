import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { v4 as uuidv4 } from 'uuid';
import { CreateAccountBodyDto } from './dto/create-account.dto';
import { LoginBodyDto } from './dto/login.dto';
import { RefreshTokenDto, TokenOutput } from './dto/token.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersRepository } from 'src/users/repository/users.repository';
import { MailService } from 'src/mail/mail.service';
import { customJwtService } from './jwt/jwt.service';
import { Payload } from './jwt/jwt.payload';
import {
  refreshTokenExpirationInCache,
  verifyEmailExpiration,
} from './auth.module';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly mailService: MailService,
    @Inject('CACHE_MANAGER')
    private readonly cacheManager: Cache,
    private readonly jwtService: customJwtService,
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

  async login({ email, password }: LoginBodyDto): Promise<TokenOutput> {
    try {
      const user = await this.validateUser(email, password);

      // payload 생성
      const payload: Payload = this.jwtService.createPayload(email, user.id);

      // refresh token 생성
      const refreshToken = await this.jwtService.generateRefreshToken(payload);

      // refresh token redis에 저장
      await this.cacheManager.set(refreshToken, user.id, {
        ttl: refreshTokenExpirationInCache,
      });

      // access token 생성 및 refresh token과 함께 반환
      return {
        access_token: this.jwtService.sign(payload),
        refresh_token: refreshToken,
      };
    } catch (e) {
      throw e;
    }
  }

  async reissueToken({
    refresh_token: refreshToken,
  }: RefreshTokenDto): Promise<TokenOutput> {
    let decoded: Payload;
    try {
      // decoding refresh token
      decoded = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_TOKEN_PRIVATE_KEY,
      });
    } catch (e) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    const refreshTokenInCache = await this.cacheManager.get(refreshToken);

    if (!refreshTokenInCache) {
      throw new NotFoundException('There is no refresh token');
    }

    const user = await this.userRepository.findOneBy({ id: decoded.sub });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const payload: Payload = this.jwtService.createPayload(user.email, user.id);
    const accessToken = this.jwtService.sign(payload);
    const newRefreshToken = await this.jwtService.generateRefreshToken(payload);

    await this.cacheManager.del(refreshToken);
    await this.cacheManager.set(newRefreshToken, user.id, {
      ttl: refreshTokenExpirationInCache,
    });

    return {
      access_token: accessToken,
      refresh_token: newRefreshToken,
    };
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
    const code: string = uuidv4();
    await this.cacheManager.set(code, user.id, { ttl: verifyEmailExpiration });

    this.mailService.sendVerificationEmail(user.email, user.email, code);
  }

  async verifyEmail(code: string): Promise<string> {
    const userId: number | undefined = await this.cacheManager.get(code);

    if (userId) {
      const user = await this.userRepository.findOneByOrFail({ id: userId });
      user.verified = true;
      await this.userRepository.save(user); // verify
      await this.cacheManager.del(code); // delete verification value

      return user.email;
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

      // TODO: password hashing
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
