import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateBookCopyDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  bookId!: number;
}
