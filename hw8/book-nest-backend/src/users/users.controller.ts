import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserInfo } from './UserInfo';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body(/**ValidationPipe**/) dto: CreateUserDto): void {
    const { name, email, password } = dto;
    this.usersService.createUser(name, email, password);
  }

  // @Post('/email-verify')
  // async verifyEmail(@Query() dto: VerifyEmailDto): Promise<string> {
  //   const { signupVerifyToken } = dto;

  //   return await this.usersService.verifyEmail(signupVerifyToken);
  // }

  @Post('/login')
  async login(@Body() dto: UserLoginDto): Promise<string> {
    const { email, password } = dto;

    return this.usersService.login(email, password);
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  async getUserInfo(@Param('id') userId: string): Promise<UserInfo> {
    return this.usersService.getUserInfo(userId);
  }

  @Get()
  findAll(
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    // return this.usersService.findAll();
    return `offset: ${offset}, limit: ${limit}`;
  }

  // @Get()
  // envtest(): string {
  //   return this.config.auth.env + ' and ' + this.config.db.env;
  // }
}
