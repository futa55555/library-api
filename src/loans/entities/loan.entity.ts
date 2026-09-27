import { BookCopy } from '../../book-copies/entities/book-copy.entity';
import { User } from '../../users/entities/user.entity';

export class Loan {
  private _id: number;
  private _user: User;
  private _bookCopy: BookCopy;

  constructor(id: number, user: User, bookCopy: BookCopy) {
    this._id = id;
    this._user = user;
    this._bookCopy = bookCopy;
  }

  get id(): number {
    return this._id;
  }
  get user(): User {
    return this._user;
  }
  get bookCopy(): BookCopy {
    return this._bookCopy;
  }
}
