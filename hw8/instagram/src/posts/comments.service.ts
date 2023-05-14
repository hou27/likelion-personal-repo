import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersRepository } from 'src/users/repository/users.repository';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    private readonly usersRepository: UsersRepository,
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
  ) {}

  async addComment(
    postId: number,
    userId: number,
    content: string,
  ): Promise<Comment> {
    if (!userId) {
      throw new UnauthorizedException('Login Needed');
    }

    const post = await this.postsRepository.findOneBy({ id: postId });
    if (!post) {
      throw new NotFoundException('Post Not Exist');
    }

    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('User Not Exist');
    }

    return await this.commentsRepository.save(
      this.commentsRepository.create({
        content,
        writer: user,
        post,
      }),
    );
  }

  async loadComments(userId: number): Promise<Comment[]> {
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('User Not Exist');
    }

    return await this.commentsRepository.find({
      where: { writer: user },
    });
  }

  async deleteComment(
    postId: number,
    commentId: number,
    userId: number,
  ): Promise<void> {
    const post = await this.postsRepository.findOneBy({ id: postId });
    if (!post) {
      throw new NotFoundException('Post Not Exist');
    }

    const comment = await this.commentsRepository.findOneBy({ id: commentId });
    if (!comment) {
      throw new NotFoundException('Comment Not Exist');
    }

    if (comment.writer.id !== userId) {
      throw new ForbiddenException('Not Your Comment');
    }

    await this.commentsRepository.delete({ id: commentId });
  }
}
