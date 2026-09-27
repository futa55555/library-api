import { Book } from '../../books/entities/book.entity';
import { User } from '../../users/entities/user.entity';

export class Reservation {
  private _id: number;
  private _user: User;
  private _book: Book;

  constructor(id: number, user: User, book: Book) {
    this._id = id;
    this._user = user;
    this._book = book;
  }

  get id(): number {
    return this._id;
  }
  get user(): User {
    return this._user;
  }
  get book(): Book {
    return this._book;
  }
}
