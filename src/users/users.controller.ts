import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({
    summary: '利用者を登録する',
    description: '利用者を新規登録する',
  })
  @ApiResponse({ status: 201, description: '登録成功' })
  @ApiResponse({ status: 409, description: '利用者がすでに登録されている' })
  @ApiResponse({ status: 422, description: '入力値が不正' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({
    summary: '利用者の一覧を取得する',
    description: '登録済みの利用者の一覧を取得する',
  })
  @ApiResponse({ status: 200, description: '取得成功' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: '指定の利用者を取得する',
    description: '指定したIDの利用者を取得する',
  })
  @ApiResponse({ status: 200, description: '取得成功' })
  @ApiResponse({
    status: 404,
    description: '指定したIDの利用者は登録されていない',
  })
  findById(@Param('id') id: string) {
    return this.usersService.findById(+id);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: '利用者を削除する',
    description: '指定したIDの利用者を削除する',
  })
  @ApiResponse({ status: 204, description: '削除成功' })
  @ApiResponse({
    status: 404,
    description: '指定したIDの利用者は登録されていない',
  })
  delete(@Param('id') id: string) {
    return this.usersService.delete(+id);
  }
}
