import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLoanDto } from './dto/create-loan.dto';
import { CreateLoanInput, LoansRepository } from './loans.repository';
import { UsersService } from '../users/users.service';
import { BookCopiesService } from '../book-copies/book-copies.service';
import { Loan } from './entities/loan.entity';
import {
  EntityAlreadyExistsError,
  EntityNotFoundError,
} from '../shared/errors';

@Injectable()
export class LoansService {
  constructor(
    private readonly loansRepository: LoansRepository,
    private readonly usersService: UsersService,
    private readonly bookCopiesService: BookCopiesService,
  ) {}

  create(createLoanDto: CreateLoanDto): Loan {
    const user = this.usersService.findById(createLoanDto.userId);
    const bookCopy = this.bookCopiesService.findById(createLoanDto.bookCopyId);
    const createLoanInput: CreateLoanInput = {
      user,
      bookCopy,
    };
    try {
      return this.loansRepository.create(createLoanInput);
    } catch (error) {
      if (error instanceof EntityAlreadyExistsError) {
        throw new ConflictException('loan already exists');
      }
      throw error;
    }
  }

  findAll(): Loan[] {
    return this.loansRepository.findAll();
  }

  findById(id: number): Loan {
    try {
      return this.loansRepository.findById(id);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException('loan not found');
      }
      throw error;
    }
  }

  delete(id: number): void {
    try {
      this.loansRepository.delete(id);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException('loan not found');
      }
      throw error;
    }
  }
}
