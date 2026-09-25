import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { BooksModule } from './books/books.module';
import { AuthorsModule } from './authors/authors.module';
import { PublishersModule } from './publishers/publishers.module';
import { BookCopiesModule } from './book-copies/book-copies.module';
import { LoansModule } from './loans/loans.module';
import { ReservationsModule } from './reservations/reservations.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    HealthModule,
    BooksModule,
    AuthorsModule,
    PublishersModule,
    BookCopiesModule,
    LoansModule,
    ReservationsModule,
    UsersModule,
  ],
})
export class AppModule {}
