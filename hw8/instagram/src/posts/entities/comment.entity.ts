import { IsNumber, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class Comment extends CoreEntity {
  @Column()
  @IsString()
  content!: string;

  @IsNumber()
  writerId!: number;

  @ManyToOne(() => Post, (post) => post.comments)
  post!: Post;
}
