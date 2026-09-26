import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { PublishersRepository } from './publishers.repository';
import {
  EntityAlreadyExistsError,
  EntityNotFoundError,
} from '../shared/errors';
import { Publisher } from './entities/publisher.entity';

@Injectable()
export class PublishersService {
  constructor(private readonly publishersRepository: PublishersRepository) {}

  create(createPublisherDto: CreatePublisherDto): Publisher {
    const createAuthorInput = createPublisherDto;
    try {
      return this.publishersRepository.save(createAuthorInput);
    } catch (error) {
      if (error instanceof EntityAlreadyExistsError) {
        throw new ConflictException('publisher already exists');
      }
      throw error;
    }
  }

  findAll(): Publisher[] {
    return this.publishersRepository.findAll();
  }

  findById(id: number): Publisher {
    try {
      return this.publishersRepository.findById(id);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException('publisher not found');
      }
      throw error;
    }
  }

  remove(id: number): void {
    try {
      this.publishersRepository.delete(id);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException('publisher not found');
      }
      throw error;
    }
  }
}
