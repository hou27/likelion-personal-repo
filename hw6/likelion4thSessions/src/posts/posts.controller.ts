import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
} from '@nestjs/common';
import { PostsService } from './posts.service';

/**
 * crud
 */

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Headers('userId') userId: string, @Body('content') content: string) {
    return this.postsService.create(userId, content);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Headers('userId') userId: string,
    @Param('id') postId: string,
    @Body('content') content: string,
  ) {
    return this.postsService.update(userId, postId, content);
  }

  @Delete(':id')
  remove(@Headers('userId') userId: string, @Param('id') postId: string) {
    return this.postsService.remove(userId, postId);
  }
}
