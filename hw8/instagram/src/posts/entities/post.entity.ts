import { IsNumber, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';

export class Post extends CoreEntity {
  @IsString()
  content!: string;

  @IsNumber()
  likes!: number;

  @IsNumber()
  writerId!: number;
}
