import { MissingParamError } from './errors/missing-params'
import { IValidator } from './i-validator'

export class RequiredFieldValidator implements IValidator {
  constructor (
    private readonly field: unknown,
    private readonly fieldName: string
  ) {}

  validate (): MissingParamError | void {
    if (this.field === null || this.field === undefined || this.field === '') {
      return new MissingParamError(this.fieldName)
    }
  }
}
