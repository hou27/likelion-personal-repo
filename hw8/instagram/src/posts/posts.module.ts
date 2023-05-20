import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { Post } from './entities/post.entity';
import { Comment } from './entities/comment.entity';
import { PostsController } from './posts.controller';
import { CommentsService } from './comments.service';
import { PostsService } from './posts.service';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Post, Comment])],
  controllers: [PostsController],
  providers: [PostsService, CommentsService],
})
export class PostsModule {}
