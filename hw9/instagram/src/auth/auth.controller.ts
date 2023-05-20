import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAccountBodyDto } from './dto/create-account.dto';
import { LoginBodyDto } from './dto/login.dto';

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
  async login(@Body() loginBody: LoginBodyDto): Promise<number> {
    return this.authService.login(loginBody);
  }

  @Post('/send-verification-email/:email')
  async sendVerifyEmail(@Param('email') email: string): Promise<void> {
    return this.authService.sendVerifyEmail(email);
  }

  @Get('verify-email')
  async verifyEmail(@Query('code') code: string): Promise<void> {
    return this.authService.verifyEmail(code);
  }
}
