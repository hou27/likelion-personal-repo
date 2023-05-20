import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { IsNumber, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from 'src/users/entities/user.entity';
import { Comment } from 'src/posts/entities/comment.entity';

@Entity()
export class Post extends CoreEntity {
  @Column()
  @IsString()
  content!: string;

  @Column({ default: 0 })
  @IsNumber()
  likes!: number;

  @ManyToOne(() => User, (user) => user.posts)
  writer!: User;

  @OneToMany(() => Comment, (comment) => comment.post, { nullable: true })
  comments?: Comment[];
}
