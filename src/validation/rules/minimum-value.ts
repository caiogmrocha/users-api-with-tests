import { MinimumValueError } from '../errors/minimum-value-error';
import { IValidator } from '../i-validator';

export class MinimumValueValidator implements IValidator {
  constructor (
    public readonly fieldName: string,
    public readonly field: unknown,
    public readonly min: number
  ) {}

  validate (): void | MinimumValueError {
    if (typeof this.field === 'string') {
      if (this.field.length < this.min) {
        return new MinimumValueError(this.fieldName, this.field, this.min);
      }
    }

    if (typeof this.field === 'number') {
      if (this.field < this.min) {
        return new MinimumValueError(this.fieldName, this.field, this.min);
      }
    }
  }
}
