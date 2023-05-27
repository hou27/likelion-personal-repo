import { Controller, Post, Body, Param, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAccountBodyDto } from './dto/create-account.dto';
import { LoginBodyDto } from './dto/login.dto';
import { RefreshTokenDto, TokenOutput } from './dto/token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() createAccountBody: CreateAccountBodyDto,
  ): Promise<void> {
    return this.authService.register(createAccountBody);
  }

  @Post('login')
  async login(@Body() loginBody: LoginBodyDto): Promise<TokenOutput> {
    return this.authService.login(loginBody);
  }

  @Post('token')
  async reissueToken(
    @Body() regenerateBody: RefreshTokenDto,
  ): Promise<TokenOutput> {
    return this.authService.reissueToken(regenerateBody);
  }

  @Post('/send-verification-email/:email')
  async sendVerifyEmail(@Param('email') email: string): Promise<void> {
    return this.authService.sendVerifyEmail(email);
  }

  @Post('verify-email')
  async verifyEmail(@Query('code') code: string): Promise<string> {
    return this.authService.verifyEmail(code);
  }
}
