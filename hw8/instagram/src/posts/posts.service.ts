import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersRepository } from 'src/users/repository/users.repository';

@Injectable()
export class PostsService {
  constructor(
    private readonly usersRepository: UsersRepository,
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  async create(userId: number, content: string): Promise<Post> {
    if (!userId) {
      throw new UnauthorizedException('Login Needed');
    }

    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('User Not Exist');
    }

    return await this.postsRepository.save(
      this.postsRepository.create({
        content,
        writer: user,
      }),
    );
  }

  async loadMyPosts(userId: number): Promise<Post[]> {
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('User Not Exist');
    }

    return await this.postsRepository.findBy({ writer: user });
  }

  async postDetail(postId: number): Promise<Post> {
    const post = await this.postsRepository.findOneBy({ id: postId });
    if (!post) {
      throw new NotFoundException('Post Not Exist');
    }

    return post;
  }

  async loadLikes(postId: number): Promise<number> {
    const post = await this.postsRepository.findOneBy({ id: postId });
    if (!post) {
      throw new NotFoundException('Post Not Exist');
    }

    return post.likes;
  }

  async addLikes(postId: number): Promise<number> {
    const post = await this.postsRepository.findOneBy({ id: postId });
    if (!post) {
      throw new NotFoundException('Post Not Exist');
    }

    post.likes++;

    return post.likes;
  }
}
