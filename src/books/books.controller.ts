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

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
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
  findAll() {
    return this.booksService.findAll().map((book) => ({
      id: book.id,
      title: book.title,
      author: book.author,
      publisher: book.publisher,
    }));
  }

  @Get(':id')
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
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}
