import { IsNumber, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Post } from './post.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Comment extends CoreEntity {
  @Column()
  @IsString()
  content!: string;

  @ManyToOne(() => User, (user) => user.comments)
  writer!: User;

  @ManyToOne(() => Post, (post) => post.comments)
  post!: Post;
}
