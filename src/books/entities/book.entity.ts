export class Book {
  id: number;
  _title: string;

  constructor(id: number, title: string) {
    this.id = id;
    this._title = title;
  }

  get title(): string {
    return this._title;
  }

  updateTitle(title: string): void {
    this._title = title;
  }
}
