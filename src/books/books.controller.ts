import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiOperation({
    summary: '本を登録する',
    description: '登録済みの著者、出版社を指定して、本を新規登録する',
  })
  @ApiResponse({ status: 201, description: '登録成功' })
  @ApiResponse({ status: 404, description: '著者または出版社が存在しない' })
  @ApiResponse({ status: 409, description: '本がすでに登録されている' })
  @ApiResponse({ status: 422, description: '入力値が不正' })
  create(@Body() createBookDto: CreateBookDto) {
    const book = this.booksService.create(createBookDto);
    return {
      id: book.id,
      title: book.title,
      author: book.author,
      publisher: book.publisher,
    };
  }

  @Get()
  @ApiOperation({
    summary: '本の一覧を取得する',
    description: '登録済みの本の一覧を取得する',
  })
  @ApiResponse({ status: 200, description: '取得成功' })
  findAll() {
    return this.booksService.findAll().map((book) => ({
      id: book.id,
      title: book.title,
      author: book.author,
      publisher: book.publisher,
    }));
  }

  @Get(':id')
  @ApiOperation({
    summary: '指定の本を取得する',
    description: '指定したIDの本を取得する',
  })
  @ApiResponse({ status: 200, description: '取得成功' })
  @ApiResponse({ status: 404, description: '指定したIDの本は登録されていない' })
  findOne(@Param('id') id: string) {
    const book = this.booksService.findById(+id);
    return {
      id: book.id,
      title: book.title,
      author: book.author,
      publisher: book.publisher,
    };
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: '本を削除する',
    description: '指定したIDの本を削除する',
  })
  @ApiResponse({ status: 204, description: '削除成功' })
  @ApiResponse({ status: 404, description: '指定したIDの本は登録されていない' })
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}
