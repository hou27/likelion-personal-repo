import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CommentsService } from './comments.service';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly commentsService: CommentsService,
  ) {}

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

  @Post(':id/comment')
  async addComment(
    @Param('id', ParseIntPipe) id: number,
    @Headers('userId') userId: string,
    @Body('content') content: string,
  ) {
    return this.commentsService.addComment(id, +userId, content);
  }

  @Get(':id/comments')
  async loadComments(@Param('id', ParseIntPipe) postId: number) {
    return this.commentsService.loadComments(postId);
  }

  @Delete(':id/comment/:commentId')
  async deleteComment(
    @Param('id', ParseIntPipe) id: number,
    @Param('commentId', ParseIntPipe) commentId: number,
    @Headers('userId') userId: string,
  ) {
    return this.commentsService.deleteComment(id, commentId, +userId);
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
