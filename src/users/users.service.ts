import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserInput, UsersRepository } from './users.repository';
import {
  EntityAlreadyExistsError,
  EntityNotFoundError,
} from '../shared/errors';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  create(createUserDto: CreateUserDto) {
    const createUserInput: CreateUserInput = {
      name: createUserDto.name,
    };
    try {
      return this.usersRepository.create(createUserInput);
    } catch (error) {
      if (error instanceof EntityAlreadyExistsError) {
        throw new ConflictException('user already exists');
      }
      throw error;
    }
  }

  findAll(): User[] {
    return this.usersRepository.findAll();
  }

  findById(id: number): User {
    try {
      return this.usersRepository.findById(id);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException('user not found');
      }
      throw error;
    }
  }

  delete(id: number): void {
    try {
      this.usersRepository.delete(id);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException('user not found');
      }
      throw error;
    }
  }
}
