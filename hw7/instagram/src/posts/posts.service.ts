import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Post } from './entities/post.entity';
import { UsersRepository } from 'src/users/users.repository';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly postsRepository: PostsRepository,
  ) {}

  create(userId: number, content: string): Post {
    if (!userId) {
      throw new UnauthorizedException('Login Needed');
    }

    const user = this.usersRepository.findOneById(userId);
    if (!user) {
      throw new NotFoundException('User Not Exist');
    }

    const newPost = this.postsRepository.save(
      this.postsRepository.create(user.id, content),
    );

    return newPost;
  }

  loadMyPosts(userId: number): Post[] {
    const user = this.usersRepository.findOneById(userId);
    if (!user) {
      throw new NotFoundException('User Not Exist');
    }

    return this.postsRepository.findByUserId(user.id);
  }

  postDetail(postId: number): Post {
    const post = this.postsRepository.findOneById(postId);
    if (!post) {
      throw new NotFoundException('Post Not Exist');
    }

    return post;
  }

  loadLikes(postId: number): number {
    const post = this.postsRepository.findOneById(postId);
    if (!post) {
      throw new NotFoundException('Post Not Exist');
    }

    return post.likes;
  }

  addLikes(postId: number): number {
    const post = this.postsRepository.findOneById(postId);
    if (!post) {
      throw new NotFoundException('Post Not Exist');
    }

    post.likes += 1;

    return post.likes;
  }
}
