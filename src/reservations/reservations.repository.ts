import { Injectable } from '@nestjs/common';
import { Reservation } from './entities/reservation.entity';
import { User } from '../users/entities/user.entity';
import { Book } from '../books/entities/book.entity';
import { EntityNotFoundError } from '../shared/errors';

export type CreateReservationInput = {
  user: User;
  book: Book;
};

@Injectable()
export class ReservationsRepository {
  private readonly reservations: Reservation[] = [];
  private nextId: number = 1;

  create(createReservationInput: CreateReservationInput): Reservation {
    const reservation = new Reservation(
      this.nextId++,
      createReservationInput.user,
      createReservationInput.book,
    );
    this.reservations.push(reservation);
    return reservation;
  }

  findAll(): Reservation[] {
    return [...this.reservations];
  }

  findById(id: number): Reservation {
    const reservation = this.reservations.find(
      (reservation) => reservation.id === id,
    );
    if (!reservation) {
      throw new EntityNotFoundError('reservation not found');
    }
    return reservation;
  }

  exists(createReservationInput: CreateReservationInput): boolean {
    return this.reservations.some(
      (reservation) =>
        reservation.user.id === createReservationInput.user.id &&
        reservation.book.id === createReservationInput.book.id,
    );
  }

  delete(id: number): void {
    const idx = this.reservations.findIndex(
      (reservation) => reservation.id === id,
    );
    if (idx === -1) {
      throw new EntityNotFoundError('reservation not found');
    }
    this.reservations.splice(idx, 1);
  }
}
