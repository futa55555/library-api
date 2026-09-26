import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { AuthorsRepository } from './authors.repository';
import {
  EntityAlreadyExistsError,
  EntityNotFoundError,
} from 'src/shared/errors';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorsService {
  constructor(private readonly authorsRepository: AuthorsRepository) {}

  create(createAuthorDto: CreateAuthorDto): void {
    const createAuthorInput = createAuthorDto;
    try {
      this.authorsRepository.save(createAuthorInput);
    } catch (error) {
      if (error instanceof EntityAlreadyExistsError) {
        throw new ConflictException('author already exists');
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

  remove(id: number) {
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
