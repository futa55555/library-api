import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookCopyDto } from './dto/create-book-copy.dto';
import {
  BookCopiesRepository,
  CreateBookCopyInput,
} from './book-copies.repository';
import { EntityNotFoundError } from '../shared/errors';
import { BookCopy } from './entities/book-copy.entity';
import { BooksService } from '../books/books.service';

@Injectable()
export class BookCopiesService {
  constructor(
    private readonly bookCopiesRepository: BookCopiesRepository,
    private readonly booksService: BooksService,
  ) {}

  create(createBookCopyDto: CreateBookCopyDto): BookCopy {
    const book = this.booksService.findById(createBookCopyDto.bookId);
    const createBookCopyInput: CreateBookCopyInput = {
      book,
    };
    return this.bookCopiesRepository.create(createBookCopyInput);
  }

  findAll(): BookCopy[] {
    return this.bookCopiesRepository.findAll();
  }

  findById(id: number): BookCopy {
    try {
      return this.bookCopiesRepository.findById(id);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException('book copy not found');
      }
      throw error;
    }
  }

  delete(id: number): void {
    try {
      this.bookCopiesRepository.delete(id);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException('book copy not found');
      }
      throw error;
    }
  }
}
