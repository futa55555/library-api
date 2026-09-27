import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { BooksModule } from '../books/books.module';
import { UsersModule } from '../users/users.module';
import { ReservationsRepository } from './reservations.repository';

@Module({
  imports: [BooksModule, UsersModule],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationsRepository],
})
export class ReservationsModule {}
