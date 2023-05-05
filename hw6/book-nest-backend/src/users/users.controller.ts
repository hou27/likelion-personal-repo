import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
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
  login(@Body() dto: UserLoginDto): string {
    const { email, password } = dto;

    return this.usersService.login(email, password);
  }

  @Get('/:id')
  getUserInfo(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    userId: string,
  ): UserInfo {
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
