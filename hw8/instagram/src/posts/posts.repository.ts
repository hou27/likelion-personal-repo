import { Injectable } from '@nestjs/common';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsRepository {
  // private posts: Post[] = [];
  // findOneById(id: number): Post {
  //   const post = this.posts.find((post) => post.id === id);
  //   return post;
  // }
  // findByUserId(userId: number): Post[] {
  //   return this.posts.filter((post) => post.writerId === userId);
  // }
  // create(userId: number, content: string): Post {
  //   const post: Post = {
  //     id: this.generateNewId(),
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //     content,
  //     writerId: userId,
  //     likes: 0,
  //   };
  //   return post;
  // }
  // save(post: Post): Post {
  //   this.posts.push(post);
  //   return post;
  // }
  // /**
  //  * util functions
  //  */
  // generateNewId(): number {
  //   return this.posts.length > 0
  //     ? +this.posts[this.posts.length - 1].id + 1
  //     : 1;
  // }
}
