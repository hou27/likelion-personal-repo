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
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CommentsService } from './comments.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { User } from 'src/users/entities/user.entity';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly commentsService: CommentsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @AuthUser() { id: userId }: User,
    @Body('content') content: string,
  ) {
    return this.postsService.create(+userId, content);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async loadMyPosts(@AuthUser() { id: userId }: User) {
    return this.postsService.loadMyPosts(userId);
  }

  @Get(':id')
  async postDetail(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.postDetail(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/comment')
  async addComment(
    @Param('id', ParseIntPipe) id: number,
    @AuthUser() { id: userId }: User,
    @Body('content') content: string,
  ) {
    return this.commentsService.addComment(id, +userId, content);
  }

  @Get(':id/comments')
  async loadComments(@Param('id', ParseIntPipe) postId: number) {
    return this.commentsService.loadComments(postId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/comment/:commentId')
  async deleteComment(
    @Param('id', ParseIntPipe) id: number,
    @Param('commentId', ParseIntPipe) commentId: number,
    @AuthUser() { id: userId }: User,
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
