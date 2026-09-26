import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({ example: '銀河鉄道の夜' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  authorId!: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  publisherId!: number;
}
