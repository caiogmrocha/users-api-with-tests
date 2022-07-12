import { MissingParamError } from './errors/missing-params-error'
import { IValidator } from './i-validator'

export class RequiredFieldValidator implements IValidator {
  constructor (
    public readonly fieldName: string,
    public readonly field: unknown
  ) {}

  validate (): MissingParamError | void {
    if (this.field === null || this.field === undefined || this.field === '') {
      return new MissingParamError(this.fieldName)
    }
  }
}
