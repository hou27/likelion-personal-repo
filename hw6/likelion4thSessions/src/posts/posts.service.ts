import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Post } from './entities/post.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostsService {
  private posts: Post[] = [];
  constructor(private readonly usersService: UsersService) {}

  create(userId: string, content: string): Post {
    const validUserId = this.getValidUserId(userId);

    const newPost = {
      id: this.generateNewId(),
      createdAt: new Date(),
      updatedAt: new Date(),
      content,
      writerId: validUserId,
    };
    this.posts.push(newPost);

    return newPost;
  }

  findAll(): Post[] {
    return this.posts;
  }

  findOne(postId: string) {
    const post = this.posts.find((post) => post.id === postId);
    if (!post) {
      throw new NotFoundException('Post Not Exist');
    }

    return post;
  }

  update(userId: string, postId: string, content: string) {
    const validUserId = this.getValidUserId(userId);

    const postIndex = this.getValidPostIndex(validUserId, postId);
    this.posts[postIndex].content = content;
    this.posts[postIndex].updatedAt = new Date();

    return this.posts[postIndex];
  }

  remove(userId: string, postId: string) {
    const validUserId = this.getValidUserId(userId);
    const postIndex = this.getValidPostIndex(validUserId, postId);

    this.posts.splice(postIndex, 1);
  }

  /**
   * util functions
   */

  getValidUserId(userId: string): string {
    if (!userId) {
      throw new UnauthorizedException('Login Needed');
    }
    return this.usersService.findOne(userId).userId;
  }

  getValidPostIndex(userId: string, postId: string): number {
    const postIndex = this.posts.findIndex((post) => post.id === postId);
    if (postIndex === -1) {
      throw new NotFoundException('Post Not Exist');
    }
    if (this.posts[postIndex].writerId !== userId) {
      throw new UnauthorizedException('Not Your Post');
    }

    return postIndex;
  }

  generateNewId(): string {
    return (
      this.posts.length > 0 ? +this.posts[this.posts.length - 1].id + 1 : 1
    ).toString();
  }
}
