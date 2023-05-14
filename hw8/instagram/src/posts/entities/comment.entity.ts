import { IsNumber } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';

export class Comment extends CoreEntity {
  @IsNumber()
  postId!: number;

  @IsNumber()
  writerId!: number;
}
