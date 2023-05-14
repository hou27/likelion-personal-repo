import { IsBoolean, IsDate, IsEmail, IsString, Matches } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Post } from 'src/posts/entities/post.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class User extends CoreEntity {
  @Column({ unique: true })
  @IsString()
  name!: string;

  @Column({ unique: true })
  @IsEmail()
  email!: string;

  @Column({ select: false })
  @IsString()
  @Matches(/^(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/, {
    message: 'Password must be at least 8 characters long, contain 1 number',
  })
  password!: string;

  @Column()
  @IsDate()
  birth!: Date;

  @Column({ default: false })
  @IsBoolean()
  verified!: boolean;

  @OneToMany(() => Post, (post) => post.writer, { nullable: true })
  posts?: Post[];
}
