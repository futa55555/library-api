import { Injectable } from '@nestjs/common';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksRepository {
  private readonly books: Book[] = [];

  save(book: Book): void {
    this.books.push(book);
  }

  findAll(): Book[] {
    return [...this.books];
  }

  delete(book: Book): void {
    const idx = this.books.findIndex((item) => item === book);
    this.books.splice(idx, 1);
  }
}
