import { Injectable } from '@nestjs/common';
import { BookCopy } from './entities/book-copy.entity';
import { Book } from '../books/entities/book.entity';
import { EntityNotFoundError } from '../shared/errors';

export type CreateBookCopyInput = {
  book: Book;
};

@Injectable()
export class BookCopiesRepository {
  private readonly bookCopies: BookCopy[] = [];
  private nextId: number = 1;

  create(createBookCopyInput: CreateBookCopyInput): BookCopy {
    const bookCopy = new BookCopy(this.nextId++, createBookCopyInput.book);
    this.bookCopies.push(bookCopy);
    return bookCopy;
  }

  findAll(): BookCopy[] {
    return [...this.bookCopies];
  }

  findById(id: number): BookCopy {
    const bookCopy = this.bookCopies.find((bookCopy) => bookCopy.id === id);
    if (!bookCopy) {
      throw new EntityNotFoundError('book copy not found');
    }
    return bookCopy;
  }

  delete(id: number): void {
    const idx = this.bookCopies.findIndex((bookCopy) => bookCopy.id === id);
    if (idx === -1) {
      throw new EntityNotFoundError('book copy not found');
    }
    this.bookCopies.splice(idx, 1);
  }
}
