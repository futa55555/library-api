import { Author } from '../../authors/entities/author.entity';
import { Publisher } from '../../publishers/entities/publisher.entity';

export class Book {
  private _id: number;
  private _author: Author;
  private _publisher: Publisher;
  private _title: string;

  constructor(id: number, author: Author, publisher: Publisher, title: string) {
    this._id = id;
    this._author = author;
    this._publisher = publisher;
    this._title = title;
  }

  get id(): number {
    return this._id;
  }
  get author(): Author {
    return this._author;
  }
  get publisher(): Publisher {
    return this._publisher;
  }
  get title(): string {
    return this._title;
  }
}
