import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
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
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}
