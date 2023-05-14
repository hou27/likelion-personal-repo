import { IsDate, IsNumber } from 'class-validator';

export class CoreEntity {
  @IsNumber()
  id!: number;

  @IsDate()
  createdAt!: Date;

  @IsDate()
  updatedAt!: Date;
}
