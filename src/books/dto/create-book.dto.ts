import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsNumber()
  authorId!: number;

  @IsNumber()
  publisherId!: number;
}
