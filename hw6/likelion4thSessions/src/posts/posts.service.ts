import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import * as uuid from 'uuid';

@Injectable()
export class PostsService {
  private posts: Post[] = [];

  create(createPostDto: CreatePostDto) {
    const { userId, title, content } = createPostDto;
    const newPost = {
      postId: uuid.v1(),
      userId,
      title,
      content,
    };
    this.posts.push(newPost);
  }

  findAll(id: string) {
    return this.posts.filter((post) => post.userId === id);
  }

  findOne(postId: string) {
    const post = this.posts.filter((post) => post.postId === postId);
    if (!post) {
      throw new NotFoundException('Post Not Exist');
    }
    console.log(post);
    return post;
  }

  update(postId: string, updatePostDto: UpdatePostDto) {
    const { title, content, userId } = updatePostDto;
    const post = this.posts.find(
      (post) => post.postId === postId && post.userId === userId,
    );
    if (!post) {
      throw new BadRequestException('Post Not Exist');
    }
    this.posts = this.posts.filter((post) => post.postId !== postId);
    console.log(this.posts);
    post.title = title;
    post.content = content;
    this.posts.push(post);
    console.log('게시글 수정 완료');
  }

  remove(id: string) {
    this.posts = this.posts.filter((post) => post.postId !== id);
  }
}
