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

  async loadComments(postId: number): Promise<Comment[]> {
    const post = await this.postsRepository.findOneBy({ id: postId });
    if (!post) {
      throw new NotFoundException('Post Not Exist');
    }

    const comments = await this.commentsRepository.find({
      where: { post: { id: postId } },
    });

    return comments;
  }

  async deleteComment(
    postId: number,
    commentId: number,
    userId: number,
  ): Promise<void> {
    console.log(postId, commentId, userId);
    const post = await this.postsRepository.findOneBy({ id: postId });
    if (!post) {
      throw new NotFoundException('Post Not Exist');
    }

    console.log(postId, commentId, userId);
    const comment = await this.commentsRepository.findOne({
      where: { id: commentId },
      relations: { writer: true },
    });
    if (!comment) {
      throw new NotFoundException('Comment Not Exist');
    }

    if (comment.writer.id !== userId) {
      throw new ForbiddenException('Not Your Comment');
    }

    const deleteResult = await this.commentsRepository.delete({
      id: commentId,
    });
    if (deleteResult.affected === 0) {
      throw new NotFoundException('Comment Not Exist');
    }
  }
}
