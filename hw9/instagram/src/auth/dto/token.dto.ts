import { IsString } from 'class-validator';

export class RefreshTokenDto {
  @IsString()
  refresh_token!: string;
}

export class TokenOutput {
  access_token!: string;

  refresh_token!: string;
}
