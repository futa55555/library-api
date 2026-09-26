import { Injectable } from '@nestjs/common';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { Publisher } from './entities/publisher.entity';
import {
  EntityAlreadyExistsError,
  EntityNotFoundError,
} from 'src/shared/errors';

type CreatePublisherInput = CreatePublisherDto;

@Injectable()
export class PublishersRepository {
  private readonly publishers: Publisher[] = [];
  private nextId: number = 1;

  save(createPublisherInput: CreatePublisherInput): void {
    if (this.exists(createPublisherInput)) {
      throw new EntityAlreadyExistsError('publisher already exists');
    }
    const publisher = new Publisher(this.nextId++, createPublisherInput.name);
    this.publishers.push(publisher);
  }

  findAll(): Publisher[] {
    return [...this.publishers];
  }

  findById(id: number): Publisher {
    const publisher = this.publishers.find((publisher) => publisher.id === id);
    if (!publisher) {
      throw new EntityNotFoundError('publisher not found');
    }
    return publisher;
  }

  exists(createPublisherInput: CreatePublisherInput): boolean {
    return this.publishers.some(
      (publisher) => publisher.name === createPublisherInput.name,
    );
  }

  delete(id: number): void {
    const idx = this.publishers.findIndex((publisher) => publisher.id === id);
    if (idx === -1) {
      throw new EntityNotFoundError('publisher not found');
    }
    this.publishers.splice(idx, 1);
  }
}
