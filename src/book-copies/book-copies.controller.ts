import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { BookCopiesService } from './book-copies.service';
import { CreateBookCopyDto } from './dto/create-book-copy.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BookCopy } from './entities/book-copy.entity';

@Controller('book-copies')
export class BookCopiesController {
  constructor(private readonly bookCopiesService: BookCopiesService) {}

  @Post()
  @ApiOperation({
    summary: '蔵書を登録する',
    description: '登録済みの本を指定して、蔵書を新規登録する',
  })
  @ApiResponse({ status: 201, description: '登録成功' })
  @ApiResponse({ status: 404, description: '本が存在しない' })
  create(@Body() createBookCopyDto: CreateBookCopyDto) {
    const bookCopy = this.bookCopiesService.create(createBookCopyDto);
    return this.toResponse(bookCopy);
  }

  @Get()
  @ApiOperation({
    summary: '蔵書の一覧を取得する',
    description: '登録済みの蔵書の一覧を取得する',
  })
  @ApiResponse({ status: 200, description: '取得成功' })
  findAll() {
    return this.bookCopiesService
      .findAll()
      .map((bookCopy) => this.toResponse(bookCopy));
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
    return this.toResponse(bookCopy);
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
  delete(@Param('id') id: string) {
    return this.bookCopiesService.delete(+id);
  }

  private toResponse(bookCopy: BookCopy) {
    return {
      id: bookCopy.id,
      book: bookCopy.book,
    };
  }
}
