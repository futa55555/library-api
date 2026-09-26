import { Injectable } from '@nestjs/common';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import {
  EntityAlreadyExistsError,
  EntityNotFoundError,
} from 'src/shared/errors';

type CreateBookInput = CreateBookDto;
type UpdateBookInput = UpdateBookDto;

@Injectable()
export class BooksRepository {
  private readonly books: Book[] = [];
  private nextId: number = 1;

  save(createBookInput: CreateBookInput): void {
    if (this.exist(createBookInput)) {
      throw new EntityAlreadyExistsError('book already exists');
    }

    const book = new Book(this.nextId++, createBookInput.title);
    this.books.push(book);
  }

  findAll(): Book[] {
    return [...this.books];
  }

  findById(id: number): Book {
    const found = this.books.find((book) => book.id === id);
    if (!found) {
      throw new EntityNotFoundError('book not found');
    }
    return found;
  }

  exist(createBookInput: CreateBookInput): boolean {
    return this.books.some((book) => book.title === createBookInput.title);
  }

  update(id: number, updateBookInput: UpdateBookInput): void {
    const book = this.findById(id);
    book.updateTitle(updateBookInput.title);
  }

  delete(id: number): void {
    const idx = this.books.findIndex((book) => book.id === id);
    if (idx === -1) {
      throw new EntityNotFoundError('book not found');
    }
    this.books.splice(idx, 1);
  }
}
