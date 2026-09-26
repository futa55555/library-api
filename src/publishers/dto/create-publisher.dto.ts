import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePublisherDto {
  @ApiProperty({ example: '新潮社' })
  @IsString()
  @IsNotEmpty()
  name!: string;
}
