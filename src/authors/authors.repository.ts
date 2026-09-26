import { Injectable } from '@nestjs/common';
import { Author } from './entities/author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
import {
  EntityAlreadyExistsError,
  EntityNotFoundError,
} from 'src/shared/errors';

type CreateAuthorInput = CreateAuthorDto;

@Injectable()
export class AuthorsRepository {
  private readonly authors: Author[] = [];
  private nextId: number = 1;

  save(createAuthorInput: CreateAuthorInput): void {
    if (this.exists(createAuthorInput)) {
      throw new EntityAlreadyExistsError('author already exists');
    }
    const author = new Author(this.nextId++, createAuthorInput.name);
    this.authors.push(author);
  }

  findAll(): Author[] {
    return [...this.authors];
  }

  findById(id: number): Author {
    const author = this.authors.find((author) => author.id === id);
    if (!author) {
      throw new EntityNotFoundError('author not found');
    }
    return author;
  }

  exists(createAuthorInput: CreateAuthorInput): boolean {
    return this.authors.some(
      (author) => author.name === createAuthorInput.name,
    );
  }

  delete(id: number): void {
    const idx = this.authors.findIndex((author) => author.id === id);
    if (idx === -1) {
      throw new EntityNotFoundError('author not found');
    }
    this.authors.splice(idx, 1);
  }
}
