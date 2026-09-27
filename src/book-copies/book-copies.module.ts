import { Module } from '@nestjs/common';
import { BookCopiesService } from './book-copies.service';
import { BookCopiesController } from './book-copies.controller';
import { BookCopiesRepository } from './book-copies.repository';
import { BooksModule } from '../books/books.module';

@Module({
  imports: [BooksModule],
  controllers: [BookCopiesController],
  providers: [BookCopiesService, BookCopiesRepository],
})
export class BookCopiesModule {}
