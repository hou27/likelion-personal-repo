import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Headers('userId') userId: string, @Body('content') content: string) {
    return this.postsService.create(+userId, content);
  }

  @Get()
  loadMyPosts(@Query('userId', ParseIntPipe) userId: number) {
    return this.postsService.loadMyPosts(userId);
  }

  @Get(':id')
  postDetail(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.postDetail(id);
  }

  @Get(':id/likes')
  loadLikes(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.loadLikes(id);
  }
}
