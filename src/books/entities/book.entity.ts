import { Author } from 'src/authors/entities/author.entity';
import { Publisher } from 'src/publishers/entities/publisher.entity';

export class Book {
  private _id: number;
  private _title: string;
  private _author: Author;
  private _publisher: Publisher;

  constructor(id: number, title: string, author: Author, publisher: Publisher) {
    this._id = id;
    this._title = title;
    this._author = author;
    this._publisher = publisher;
  }

  get id(): number {
    return this._id;
  }
  get title(): string {
    return this._title;
  }
  get author(): Author {
    return this._author;
  }
  get publisher(): Publisher {
    return this._publisher;
  }
}
