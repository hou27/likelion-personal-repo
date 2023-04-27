import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UserInfo } from './UserInfo';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  createUser(@Body() dto: CreateUserDto): void {
    const { name, email, password } = dto;
    this.usersService.createUser(name, email, password);
  }

  // @Post('/email-verify')
  // async verifyEmail(@Query() dto: VerifyEmailDto): Promise<string> {
  //   const { signupVerifyToken } = dto;

  //   return await this.usersService.verifyEmail(signupVerifyToken);
  // }

  @Post('/login')
  login(@Body() dto: UserLoginDto): string {
    const { email, password } = dto;

    return this.usersService.login(email, password);
  }

  @Get('/:id')
  getUserInfo(@Param('id') userId: string): UserInfo {
    return this.usersService.getUserInfo(userId);
  }
}
