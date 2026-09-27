import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { BookCopy } from '../book-copies/entities/book-copy.entity';
import { Loan } from './entities/loan.entity';
import {
  EntityAlreadyExistsError,
  EntityNotFoundError,
} from '../shared/errors';

export type CreateLoanInput = {
  user: User;
  bookCopy: BookCopy;
};

@Injectable()
export class LoansRepository {
  private readonly loans: Loan[] = [];
  private nextId: number = 1;

  create(createLoanInput: CreateLoanInput): Loan {
    if (this.exists(createLoanInput)) {
      throw new EntityAlreadyExistsError('loan already exists');
    }
    const loan = new Loan(
      this.nextId++,
      createLoanInput.user,
      createLoanInput.bookCopy,
    );
    this.loans.push(loan);
    return loan;
  }

  findAll(): Loan[] {
    return [...this.loans];
  }

  findById(id: number): Loan {
    const loan = this.loans.find((loan) => loan.id === id);
    if (!loan) {
      throw new EntityNotFoundError('loan not found');
    }
    return loan;
  }

  exists(createLoanInput: CreateLoanInput): boolean {
    return this.loans.some(
      (loan) =>
        loan.user.id === createLoanInput.user.id &&
        loan.bookCopy.book.id === createLoanInput.bookCopy.book.id,
    );
  }

  delete(id: number): void {
    const idx = this.loans.findIndex((loan) => loan.id === id);
    if (idx === -1) {
      throw new EntityNotFoundError('loan not found');
    }
    this.loans.splice(idx, 1);
  }
}
