import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { AuthorsRepository } from './authors.repository';
import {
  EntityAlreadyExistsError,
  EntityNotFoundError,
  EntityUnprocessableError,
} from '../shared/errors';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorsService {
  constructor(private readonly authorsRepository: AuthorsRepository) {}

  create(createAuthorDto: CreateAuthorDto): Author {
    const createAuthorInput = createAuthorDto;
    try {
      return this.authorsRepository.create(createAuthorInput);
    } catch (error) {
      if (error instanceof EntityAlreadyExistsError) {
        throw new ConflictException('author already exists');
      }
      if (error instanceof EntityUnprocessableError) {
        throw new UnprocessableEntityException('name cannot be empty');
      }
      throw error;
    }
  }

  findAll(): Author[] {
    return this.authorsRepository.findAll();
  }

  findById(id: number): Author {
    try {
      return this.authorsRepository.findById(id);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException('author not found');
      }
      throw error;
    }
  }

  delete(id: number) {
    try {
      this.authorsRepository.delete(id);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException('author not found');
      }
      throw error;
    }
  }
}
