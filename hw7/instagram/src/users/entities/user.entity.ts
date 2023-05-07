import { IsBoolean, IsDate, IsEmail, IsString, Matches } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Post } from 'src/posts/entities/post.entity';

export class User extends CoreEntity {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsDate()
  birth!: Date;

  @IsString()
  @Matches(/^(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/, {
    message: 'Password must be at least 8 characters long, contain 1 number',
  })
  password!: string;

  @IsBoolean()
  verified!: boolean;

  posts?: Post[];
}
