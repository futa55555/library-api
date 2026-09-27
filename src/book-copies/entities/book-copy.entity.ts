import { Book } from '../../books/entities/book.entity';

export class BookCopy {
  private _id: number;
  private _book: Book;

  constructor(id: number, book: Book) {
    this._id = id;
    this._book = book;
  }

  get id(): number {
    return this._id;
  }
  get book(): Book {
    return this._book;
  }
}
