import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @Transform(({ value, obj }) => {
    if (obj.password.includes(obj.name.trim())) {
      throw new Error('password should not contain name');
    }
    return value.trim();
  })
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  name: string;

  @IsEmail()
  @MaxLength(60)
  email: string;

  @IsString()
  @Matches(/^[A-Za-z\d!@#$%^&*()]{8,30}$/)
  password: string;
}
