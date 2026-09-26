import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BooksRepository } from './books.repository';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(private readonly booksRepository: BooksRepository) {}

  create(createBookDto: CreateBookDto): void {
    const createBookInput = createBookDto;
    this.booksRepository.save(createBookInput);
  }

  findAll(): Book[] {
    return this.booksRepository.findAll();
  }

  findById(id: number): Book {
    return this.booksRepository.findById(id);
  }

  update(id: number, updateBookDto: UpdateBookDto): void {
    this.booksRepository.update(id, updateBookDto);
  }

  remove(id: number) {
    this.booksRepository.delete(id);
  }
}
