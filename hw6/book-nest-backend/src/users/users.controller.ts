import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserInfo } from './UserInfo';
import { UsersService } from './users.service';
import { ConfigService, ConfigType } from '@nestjs/config';
import envconfig from 'src/config/envconfig';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    @Inject(envconfig.KEY) private config: ConfigType<typeof envconfig>,
  ) {}

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

  @Get()
  envtest(): string {
    return this.config.auth.env + ' and ' + this.config.db.env;
  }
}
