import { EntityUnprocessableError } from '../errors';

export class PersonName {
  private readonly _familyName: string;
  private readonly _givenName: string;

  constructor(familyName: string, givenName: string) {
    const normalizedFamilyName = familyName.trim();
    const normalizedGivenName = givenName.trim();
    if (normalizedFamilyName === '' || normalizedGivenName === '') {
      throw new EntityUnprocessableError('name cannot be empty');
    }
    this._familyName = familyName;
    this._givenName = givenName;
  }

  private get familyName(): string {
    return this._familyName;
  }
  private get givenName(): string {
    return this._givenName;
  }
  get fullName(): string {
    return this._familyName + ' ' + this._givenName;
  }

  equals(other: PersonName): boolean {
    return (
      this._familyName === other.familyName &&
      this._givenName === other.givenName
    );
  }
}
