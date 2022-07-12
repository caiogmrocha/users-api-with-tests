import { ValidationError } from "./errors/validation-error";
import { RequiredFieldValidator } from "./required-field";
import { ValidationCompositor } from "./validation-compositor";

describe('Validation Compositor', () => {
  it('should return a ValidationError instance', () => {
    const sut = new ValidationCompositor([]);

    const error = sut.validate()

    expect(error).toBeInstanceOf(ValidationError)
  })

  it('should return a ValidationError instance with errors', () => {
    const anyField = ''
    const sut = new ValidationCompositor([
      new RequiredFieldValidator('field', anyField)
    ]);

    const error = sut.validate()

    expect(error).toBeInstanceOf(ValidationError)
    expect(error.errors).toEqual({
      field: expect.arrayContaining([
        expect.any(String)
      ])
    })
  })

  it('should return a ValidationError instance without errors', () => {
    const anyField = 'field_value'
    const sut = new ValidationCompositor([
      new RequiredFieldValidator('field', anyField)
    ]);

    const error = sut.validate()

    expect(error).toBeInstanceOf(ValidationError)
    expect(error.errors).toEqual({})
  })
})
