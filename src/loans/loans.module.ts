import { Module } from '@nestjs/common';
import { LoansService } from './loans.service';
import { LoansController } from './loans.controller';
import { LoansRepository } from './loans.repository';
import { UsersModule } from '../users/users.module';
import { BookCopiesModule } from '../book-copies/book-copies.module';

@Module({
  imports: [UsersModule, BookCopiesModule],
  controllers: [LoansController],
  providers: [LoansService, LoansRepository],
})
export class LoansModule {}
