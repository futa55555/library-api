import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: '円堂守' })
  @IsString()
  @IsNotEmpty()
  name!: string;
}
