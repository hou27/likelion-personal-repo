import { Injectable } from '@nestjs/common';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import { ONEYEAR, Payload } from './jwt.payload';

@Injectable()
export class customJwtService {
  constructor(private readonly jwtService: JwtService) {}

  sign(payload: Payload): string {
    return this.jwtService.sign(payload);
  }

  verify(token: string, options?: JwtVerifyOptions): Payload {
    return this.jwtService.verify(token, { secret: options?.secret });
  }

  createPayload(email: string, sub: number): Payload {
    return { email, sub };
  }

  generateRefreshToken(payload: Payload): string {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_TOKEN_PRIVATE_KEY,
      expiresIn: ONEYEAR,
    });
  }
}
