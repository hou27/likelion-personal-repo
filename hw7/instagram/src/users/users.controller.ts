import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/check')
  checkDuplicateUsername(@Query('username') username: string): boolean {
    return this.usersService.checkDuplicateUsername(username);
  }
}
