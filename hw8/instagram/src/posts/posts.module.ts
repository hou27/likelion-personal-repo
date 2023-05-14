import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { CommentsService } from './comments.service';
import { Comment } from './entities/comment.entity';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Post, Comment])],
  controllers: [PostsController],
  providers: [PostsService, CommentsService],
})
export class PostsModule {}
