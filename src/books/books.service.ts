import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BooksRepository } from './books.repository';
import { Book } from './entities/book.entity';
import {
  EntityAlreadyExistsError,
  EntityNotFoundError,
} from 'src/shared/errors';

@Injectable()
export class BooksService {
  constructor(private readonly booksRepository: BooksRepository) {}

  create(createBookDto: CreateBookDto): void {
    const createBookInput = createBookDto;
    try {
      this.booksRepository.save(createBookInput);
    } catch (error) {
      if (error instanceof EntityAlreadyExistsError) {
        throw new ConflictException('book already exists');
      }
      throw error;
    }
  }

  findAll(): Book[] {
    return this.booksRepository.findAll();
  }

  findById(id: number): Book {
    try {
      return this.booksRepository.findById(id);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException('book not found');
      }
      throw error;
    }
  }

  update(id: number, updateBookDto: UpdateBookDto): void {
    this.booksRepository.update(id, updateBookDto);
  }

  remove(id: number) {
    try {
      this.booksRepository.delete(id);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException('book not found');
      }
      throw error;
    }
  }
}
