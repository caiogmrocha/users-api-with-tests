import { RequiredFieldError } from "../errors/required-field-error"
import { RequiredFieldValidator } from "./required-field"

describe('Required Field Validator', () => {
  it('should throw if a empty string is provided', () => {
    const anyField = ''
    const sut = new RequiredFieldValidator('any_field', anyField)

    const error = sut.validate()

    expect(error).toEqual(new RequiredFieldError('any_field'))
  })

  it('should throw if null is provided', () => {
    const anyField = null
    const sut = new RequiredFieldValidator('any_field', anyField)

    const error = sut.validate()

    expect(error).toEqual(new RequiredFieldError('any_field'))
  })

  it('should throw if undefined is provided', () => {
    const anyField = undefined
    const sut = new RequiredFieldValidator('any_field', anyField)

    const error = sut.validate()

    expect(error).toEqual(new RequiredFieldError('any_field'))
  })
})
