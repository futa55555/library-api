import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import {
  CreateReservationInput,
  ReservationsRepository,
} from './reservations.repository';
import { UsersService } from '../users/users.service';
import { BooksService } from '../books/books.service';
import {
  EntityAlreadyExistsError,
  EntityNotFoundError,
} from '../shared/errors';
import { Reservation } from './entities/reservation.entity';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
    private readonly usersService: UsersService,
    private readonly booksService: BooksService,
  ) {}

  create(createReservationDto: CreateReservationDto): Reservation {
    const user = this.usersService.findById(createReservationDto.userId);
    const book = this.booksService.findById(createReservationDto.bookId);
    const createReservationInput: CreateReservationInput = {
      user,
      book,
    };
    try {
      return this.reservationsRepository.create(createReservationInput);
    } catch (error) {
      if (error instanceof EntityAlreadyExistsError) {
        throw new ConflictException('reservation already exists');
      }
      throw error;
    }
  }

  findAll(): Reservation[] {
    return this.reservationsRepository.findAll();
  }

  findById(id: number): Reservation {
    try {
      return this.reservationsRepository.findById(id);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException('reservation not found');
      }
      throw error;
    }
  }

  delete(id: number): void {
    try {
      this.reservationsRepository.delete(id);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException('reservation not found');
      }
      throw error;
    }
  }
}
