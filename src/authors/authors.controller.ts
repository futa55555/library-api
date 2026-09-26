import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  @ApiOperation({
    summary: '著者を登録する',
    description: '著者を新規登録する',
  })
  @ApiResponse({ status: 201, description: '登録成功' })
  @ApiResponse({ status: 409, description: '著者がすでに登録されている' })
  @ApiResponse({ status: 422, description: '入力値が不正' })
  create(@Body() createAuthorDto: CreateAuthorDto) {
    const author = this.authorsService.create(createAuthorDto);
    return {
      id: author.id,
      name: author.name,
    };
  }

  @Get()
  @ApiOperation({
    summary: '著者の一覧を取得する',
    description: '登録済みの著者の一覧を取得する',
  })
  @ApiResponse({ status: 200, description: '取得成功' })
  findAll() {
    return this.authorsService.findAll().map((author) => ({
      id: author.id,
      name: author.name,
    }));
  }

  @Get(':id')
  @ApiOperation({
    summary: '指定の著者を取得する',
    description: '指定したIDの著者を取得する',
  })
  @ApiResponse({ status: 200, description: '取得成功' })
  @ApiResponse({
    status: 404,
    description: '指定したIDの著者は登録されていない',
  })
  findById(@Param('id') id: string) {
    const author = this.authorsService.findById(+id);
    return {
      id: author.id,
      name: author.name,
    };
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: '著者を削除する',
    description: '指定したIDの著者を削除する',
  })
  @ApiResponse({ status: 204, description: '削除成功' })
  @ApiResponse({
    status: 404,
    description: '指定したIDの著者は登録されていない',
  })
  remove(@Param('id') id: string) {
    return this.authorsService.remove(+id);
  }
}
