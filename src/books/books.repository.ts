import { Injectable } from '@nestjs/common';
import { Book } from './entities/book.entity';
import {
  EntityAlreadyExistsError,
  EntityNotFoundError,
} from 'src/shared/errors';
import { Author } from 'src/authors/entities/author.entity';
import { Publisher } from 'src/publishers/entities/publisher.entity';

type CreateBookInput = {
  title: string;
  author: Author;
  publisher: Publisher;
};

@Injectable()
export class BooksRepository {
  private readonly books: Book[] = [];
  private nextId: number = 1;

  save(createBookInput: CreateBookInput): Book {
    if (this.exist(createBookInput)) {
      throw new EntityAlreadyExistsError('book already exists');
    }
    const book = new Book(
      this.nextId++,
      createBookInput.title,
      createBookInput.author,
      createBookInput.publisher,
    );
    this.books.push(book);
    return book;
  }

  findAll(): Book[] {
    return [...this.books];
  }

  findById(id: number): Book {
    const book = this.books.find((book) => book.id === id);
    if (!book) {
      throw new EntityNotFoundError('book not found');
    }
    return book;
  }

  exist(createBookInput: CreateBookInput): boolean {
    return this.books.some((book) => book.title === createBookInput.title);
  }

  delete(id: number): void {
    const idx = this.books.findIndex((book) => book.id === id);
    if (idx === -1) {
      throw new EntityNotFoundError('book not found');
    }
    this.books.splice(idx, 1);
  }
}
