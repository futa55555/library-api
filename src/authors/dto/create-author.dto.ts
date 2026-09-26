import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAuthorDto {
  @ApiProperty({ example: '宮沢賢治' })
  @IsString()
  @IsNotEmpty()
  name!: string;
}
