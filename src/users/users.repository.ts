import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import {
  EntityAlreadyExistsError,
  EntityNotFoundError,
} from '../shared/errors';

export type CreateUserInput = {
  name: string;
};

@Injectable()
export class UsersRepository {
  private readonly users: User[] = [];
  private nextId: number = 1;

  create(createUserInput: CreateUserInput): User {
    if (!this.exists(createUserInput)) {
      throw new EntityAlreadyExistsError('user already exists');
    }
    const user = new User(this.nextId++, createUserInput.name);
    this.users.push(user);
    return user;
  }

  findAll(): User[] {
    return [...this.users];
  }

  findById(id: number): User {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new EntityNotFoundError('user not found');
    }
    return user;
  }

  exists(createUserInput: CreateUserInput): boolean {
    return this.users.some((user) => user.name === createUserInput.name);
  }

  delete(id: number): void {
    const idx = this.users.findIndex((user) => user.id === id);
    if (idx === -1) {
      throw new EntityNotFoundError('user not found');
    }
    this.users.splice(idx, 1);
  }
}
