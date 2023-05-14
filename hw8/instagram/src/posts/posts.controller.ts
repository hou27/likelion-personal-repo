import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async create(
    @Headers('userId') userId: string,
    @Body('content') content: string,
  ) {
    return this.postsService.create(+userId, content);
  }

  @Get()
  async loadMyPosts(@Query('userId', ParseIntPipe) userId: number) {
    return this.postsService.loadMyPosts(userId);
  }

  @Get(':id')
  async postDetail(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.postDetail(id);
  }

  @Get(':id/likes')
  async loadLikes(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.loadLikes(id);
  }

  @Patch(':id/like')
  async addLikes(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.addLikes(id);
  }
}
