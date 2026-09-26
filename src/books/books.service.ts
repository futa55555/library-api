import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { BooksRepository } from './books.repository';
import { Book } from './entities/book.entity';
import {
  EntityAlreadyExistsError,
  EntityNotFoundError,
} from '../shared/errors';
import { AuthorsService } from '../authors/authors.service';
import { PublishersService } from '../publishers/publishers.service';

@Injectable()
export class BooksService {
  constructor(
    private readonly booksRepository: BooksRepository,
    private readonly authorsService: AuthorsService,
    private readonly publishersService: PublishersService,
  ) {}

  create(createBookDto: CreateBookDto): Book {
    const author = this.authorsService.findById(createBookDto.authorId);
    const publisher = this.publishersService.findById(
      createBookDto.publisherId,
    );

    const createBookInput = {
      title: createBookDto.title,
      author: author,
      publisher: publisher,
    };

    try {
      return this.booksRepository.save(createBookInput);
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
