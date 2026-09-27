import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { BookCopiesService } from './book-copies.service';
import { CreateBookCopyDto } from './dto/create-book-copy.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('book-copies')
export class BookCopiesController {
  constructor(private readonly bookCopiesService: BookCopiesService) {}

  @Post()
  @ApiOperation({
    summary: '蔵書を登録する',
    description: '登録済みの本を指定して、実際に扱う蔵書を新規登録する',
  })
  @ApiResponse({ status: 201, description: '登録成功' })
  create(@Body() createBookCopyDto: CreateBookCopyDto) {
    const bookCopy = this.bookCopiesService.create(createBookCopyDto);
    return {
      id: bookCopy.id,
      book: bookCopy.book,
    };
  }

  @Get()
  @ApiOperation({
    summary: '蔵書の一覧を取得する',
    description: '登録済みの蔵書の一覧を取得する',
  })
  @ApiResponse({ status: 200, description: '取得成功' })
  findAll() {
    return this.bookCopiesService.findAll().map((bookCopy) => ({
      id: bookCopy.id,
      book: bookCopy.book,
    }));
  }

  @Get(':id')
  @ApiOperation({
    summary: '指定の蔵書を取得する',
    description: '指定したIDの蔵書を取得する',
  })
  @ApiResponse({ status: 200, description: '取得成功' })
  @ApiResponse({
    status: 404,
    description: '指定したIDの蔵書は登録されていない',
  })
  findById(@Param('id') id: string) {
    const bookCopy = this.bookCopiesService.findById(+id);
    return {
      id: bookCopy.id,
      book: bookCopy.book,
    };
  }

  @Delete(':id')
  @ApiOperation({
    summary: '蔵書を削除する',
    description: '指定したIDの蔵書を削除する',
  })
  @ApiResponse({ status: 204, description: '削除成功' })
  @ApiResponse({
    status: 404,
    description: '指定したIDの蔵書は登録されていない',
  })
  remove(@Param('id') id: string) {
    return this.bookCopiesService.remove(+id);
  }
}
