import { IsBoolean, IsDate, IsEmail, IsString, Matches } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';

export class User extends CoreEntity {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @Matches(/^(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/, {
    message: 'Password must be at least 8 characters long, contain 1 number',
  })
  password!: string;

  @IsDate()
  birth!: Date;

  @IsBoolean()
  verified!: boolean;
}
