export class Book {
  id: number;
  private _title: string;
  private _author: string;
  private _publisher: string;

  constructor(id: number, title: string, author: string, publisher: string) {
    this.id = id;
    this._title = title;
    this._author = author;
    this._publisher = publisher;
  }

  get title(): string {
    return this._title;
  }
  get author(): string {
    return this._author;
  }
  get publisher(): string {
    return this._publisher;
  }
}
