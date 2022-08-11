import { InvalidEmailError } from '../errors/invalid-email-error';
import { IValidator } from '../i-validator';

export class EmailValidator implements IValidator {
  constructor (
    public readonly fieldName: string,
    public readonly field: unknown
  ) {}

  validate (): void | InvalidEmailError {
    if (this.field && typeof this.field === 'string') {
      const regExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

      if (!(regExp.test(this.field))) {
        return new InvalidEmailError(this.fieldName);
      }
    }
  }
}
